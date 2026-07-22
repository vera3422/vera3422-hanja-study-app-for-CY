import pandas as pd
from pathlib import Path

df = None
grades_list = None

def load_hanja_data():
    global df, grades_list
    current_file = Path(__file__).resolve()
    data_dir = current_file.parent.parent.parent / "data"
    csv_path = data_dir / "hanja_all.csv"
    
    if not csv_path.exists():
        print(f"경로 오류: {csv_path}")
        return None, None
    
    df = pd.read_csv(csv_path)
    grades_list = ["8급","7급Ⅱ","7급","6급Ⅱ","6급","5급Ⅱ","5급","4급Ⅱ","4급","3급Ⅱ","3급","2급","1급"]
    
    print(f"✅ 성공! 총 {len(df)}개의 한자 데이터를 로드했습니다.")
    return df, grades_list

# 모듈 import 시 자동 로드
load_hanja_data()

if __name__ == "__main__":
    load_hanja_data()