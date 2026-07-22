from typing import List

GRADES = ["8급", "7급Ⅱ", "7급", "6급Ⅱ", "6급", "5급Ⅱ", "5급", 
          "4급Ⅱ", "4급", "3급Ⅱ", "3급", "2급", "1급"]

def get_grade_index(grade: str) -> int:
    """등급의 순서 인덱스 반환"""
    try:
        return GRADES.index(grade)
    except ValueError:
        return 0  # 기본 8급

def get_grade_range(selected_grade: str, mode: int) -> List[str]:
    """
    mode 1: 한자→훈/음 (8급 ~ 선택한 등급까지)
    mode 2: 훈/음→한자 (8급 ~ 선택한 등급 - 2단계)
    """
    idx = get_grade_index(selected_grade)
    
    if mode == 1:
        # 8급부터 선택 등급까지
        return GRADES[:idx + 1]
    else:
        # 8급부터 (선택 등급 - 2)까지
        end_idx = max(0, idx - 2)
        return GRADES[:end_idx + 1]

# 테스트
if __name__ == "__main__":
    print("5급, mode=1:", get_grade_range("5급", 1))
    print("5급, mode=2:", get_grade_range("5급", 2))
    print("7급Ⅱ, mode=2:", get_grade_range("7급Ⅱ", 2))