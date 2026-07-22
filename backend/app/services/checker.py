# backend/app/services/checker.py
import re
from typing import Dict, List, Optional

def _clean_text(text: str) -> str:
    """타이핑 검증용 공통 클리닝: [ ] 제거 + 공백 제거"""
    if not text:
        return ''
    # [ ] 괄호 안 내용 제거
    cleaned = re.sub(r'\[.*?\]', '', text)
    # 모든 공백 제거 + 소문자 정규화
    return re.sub(r'\s+', '', cleaned).strip().lower()


def _get_joined_option(hanja_info: Dict) -> str:
    """훈/음 join (모든 파일에서 공유)"""
    parts = []
    for col in ['훈/음 (1)', '훈/음 (2)', '훈/음 (3)']:
        val = str(hanja_info.get(col, '')).strip()
        if val and val.lower() != 'nan':
            parts.append(val)
    return " / ".join(parts) if parts else ""


def check_answer(
    submitted: str,
    correct_hun: str = '',
    correct_eum: str = '',
    answer_type: str = "hun",
    correct_hun_eum: str = None,
    hun_eum_list: list = None
) -> bool:
    """
    통합 정답 검증 함수
    - 1-1: 객관식 (hun)
    - 1-2: 타이핑 (typing)
    """
    if not submitted:
        return False

    submitted = submitted.strip()

    # ==================== 1-2 Typing Mode ====================
    if answer_type == "typing":
        submitted_clean = _clean_text(submitted)
        
        if correct_hun_eum:
            possibles = [_clean_text(p) for p in correct_hun_eum.split('/') if p.strip()]
            return any(
                submitted_clean == p or 
                submitted_clean in p or 
                p in submitted_clean 
                for p in possibles
            )
        
        # fallback (구조 변경 전 호환용)
        return _clean_text(submitted) in _clean_text(correct_hun) or \
               _clean_text(submitted) in _clean_text(correct_eum)

    # ==================== 1-1 객관식 Mode ====================
    # joined 문자열 우선
    if correct_hun_eum:
        possibles = []
        for sep in ['/', ' / ']:
            possibles.extend([p.strip() for p in correct_hun_eum.split(sep) if p.strip()])
        
        return any(
            submitted == p or 
            submitted in p or 
            p in submitted or
            submitted.replace(' ', '') == p.replace(' ', '') 
            for p in possibles
        )

    # 기타 fallback
    if hun_eum_list:
        return submitted in [p.strip() for p in hun_eum_list if p]
    
    if answer_type == "hun":
        return submitted in correct_hun or correct_hun in submitted
    else:  # eum
        return submitted == correct_eum.strip()