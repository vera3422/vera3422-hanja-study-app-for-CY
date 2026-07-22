import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

interface MethodProps {
  selectedLevel: string;
  onBackToMenu: () => void;
}

export default function Method21({ selectedLevel, onBackToMenu }: MethodProps) {
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; color: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextQuestion = async () => {
    setIsLoading(true);
    try {
      // TODO: 백엔드 method='2-1' 연동
      const data = await apiClient.getNextQuestion('default', selectedLevel, '2-1');
      setCurrentQuestion(data);
      setSelectedOption(null);
      setFeedback(null);
    } catch (err) {
      console.error(err);
      alert('문제를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (submitted: string) => {
    // TODO: submitAnswer 연동
    setFeedback({
      message: "정답입니다! (2-1 스켈레톤)",
      color: 'text-green-600'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="text-6xl mb-6">✍️</div>
        <h2 className="text-4xl font-bold mb-4">{selectedLevel} 학습 (2-1 훈/음 → 한자 객관식)</h2>
        
        {currentQuestion ? (
          <div className="bg-white p-8 rounded-3xl shadow">
            <p className="text-2xl mb-8 font-medium">다음 뜻·음의 한자를 선택하세요</p>
            <p className="text-5xl mb-10 font-bold text-indigo-600">{currentQuestion.question_text || '훈음 예시'}</p>

            {/* 옵션 영역 - TODO: 백엔드에서 options 받도록 */}
            <div className="space-y-3 mb-8 text-left">
              {[1,2,3,4,5].map((num, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(`한자${num}`)}
                  className="w-full py-5 px-6 rounded-2xl border-2 border-gray-200 hover:border-indigo-400 text-xl"
                >
                  {num}. 한자 옵션 {num}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`text-3xl font-bold mb-6 ${feedback.color}`}>
                {feedback.message}
              </div>
            )}

            <button 
              onClick={() => feedback ? fetchNextQuestion() : handleAnswer(selectedOption || '')}
              className="w-full py-5 bg-indigo-600 text-white rounded-3xl text-xl font-medium"
            >
              {feedback ? "다음 문제" : "답안 제출"}
            </button>
          </div>
        ) : (
          <button 
            onClick={fetchNextQuestion}
            disabled={isLoading}
            className="px-10 py-5 bg-indigo-600 text-white rounded-3xl text-xl font-medium w-full"
          >
            {isLoading ? "로딩 중..." : "문제 시작하기"}
          </button>
        )}

        <button 
          onClick={onBackToMenu}
          className="mt-6 text-gray-500 underline"
        >
          ← 메뉴로 돌아가기
        </button>
      </div>
    </div>
  );
}