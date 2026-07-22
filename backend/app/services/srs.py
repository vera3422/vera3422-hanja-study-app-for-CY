from typing import Dict, List
import random

class SRSManager:
    def __init__(self):
        # 사용자별 + 급수별 weight 저장 (임시 메모리, 나중에 DB로 교체)
        self.weights: Dict[str, Dict[str, float]] = {}  # key: "user_id:grade"

    def get_weights_key(self, user_id: str, grade: str) -> str:
        return f"{user_id}:{grade}"

    def initialize_weights(self, hanja_list: List[dict], user_id: str = "default", grade: str = "8급"):
        """특정 급수의 SRS 가중치 초기화 (1.0)"""
        key = self.get_weights_key(user_id, grade)
        self.weights[key] = {item['한자']: 1.0 for item in hanja_list if item.get('급수') == grade}

    def update_weight(self, user_id: str, grade: str, hanja: str, correct: bool):
        """정답/오답에 따라 가중치 업데이트"""
        key = self.get_weights_key(user_id, grade)
        if key not in self.weights:
            self.weights[key] = {}

        current = self.weights[key].get(hanja, 1.0)

        if correct:
            new_weight = max(0.1, current * 0.5)   # 정답 → 출현 확률 ↓
        else:
            new_weight = min(10.0, current * 2.0)  # 오답 → 출현 확률 ↑

        self.weights[key][hanja] = new_weight

    def get_next_question(self, user_id: str, grades: List[str]):
        """가중 랜덤으로 다음 문제 선택"""
        candidates = []
        weights = []

        for grade in grades:
            key = self.get_weights_key(user_id, grade)
            if key in self.weights:
                for hanja, weight in self.weights[key].items():
                    candidates.append({"한자": hanja, "grade": grade})
                    weights.append(weight)

        if not candidates:
            return None

        # 가중 랜덤 선택
        selected = random.choices(candidates, weights=weights, k=1)[0]
        return selected

# 전역 인스턴스
srs_manager = SRSManager()