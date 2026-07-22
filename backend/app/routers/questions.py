from fastapi import APIRouter, Query
from pydantic import BaseModel

from app.services.learning.factory import get_learning_method

router = APIRouter(prefix="/api", tags=["questions"])


class SubmitAnswerRequest(BaseModel):
    """POST 요청 본문 모델"""
    user_id: str = "default"
    hanja: str
    grade: str
    submitted: str
    method: str = "1-1"      # ← 핵심: method 필드 추가


@router.get("/next-question")
def get_next_question(
    user_id: str = Query("default", description="사용자 ID"),
    selected_grade: str = Query(..., description="목표 등급"),
    method: str = Query("1-1", description="학습 방법 (1-1, 1-2, 2-1, 2-2)")
):
    """학습 방법별 다음 문제 출제"""
    try:
        learning = get_learning_method(method)
        return learning.get_next_question(user_id, selected_grade)
    except ValueError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"문제 생성 중 오류: {str(e)}"}


@router.post("/submit-answer")
def submit_answer(request: SubmitAnswerRequest):
    """학습 방법별 정답 제출 → 검증 → SRS 업데이트"""
    try:
        learning = get_learning_method(request.method)
        return learning.submit_answer(
            user_id=request.user_id,
            hanja=request.hanja,
            grade=request.grade,
            submitted=request.submitted
        )
    except ValueError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"답안 처리 중 오류: {str(e)}"}