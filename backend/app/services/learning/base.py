from abc import ABC, abstractmethod
from typing import Dict, Any

class QuestionGenerator(ABC):
    """문제 생성 인터페이스"""
    @abstractmethod
    def generate(self, user_id: str, selected_grade: str, **kwargs) -> Dict[str, Any]:
        pass


class AnswerChecker(ABC):
    """정답 검증 인터페이스"""
    @abstractmethod
    def check(
        self,
        submitted: str,
        correct_data: Dict[str, Any],
        **kwargs
    ) -> bool:
        pass


class LearningMethod(ABC):
    """한 학습 방법을 완전히 담당하는 통합 인터페이스"""
    
    @property
    @abstractmethod
    def method_id(self) -> str:
        """1-1 | 1-2 | 2-1 | 2-2"""
        pass

    @abstractmethod
    def get_next_question(
        self,
        user_id: str,
        selected_grade: str
    ) -> Dict[str, Any]:
        pass

    @abstractmethod
    def submit_answer(
        self,
        user_id: str,
        hanja: str,
        grade: str,
        submitted: str,
        **kwargs
    ) -> Dict[str, Any]:
        pass