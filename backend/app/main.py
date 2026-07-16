from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="한자능력검정 학습 앱")

# CORS 설정 (프론트엔드와 연결하기 위함)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 나중에 Vercel 주소로 제한
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "한자 학습 앱 API 서버가 정상 작동 중입니다!"}

print("한자 학습 앱 백엔드 시작!")