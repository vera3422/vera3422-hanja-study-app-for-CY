import { useState } from 'react';

interface MethodProps {
  selectedLevel: string;
  onBackToMenu: () => void;
}

export default function Method22({ selectedLevel, onBackToMenu }: MethodProps) {
  const [feedback, setFeedback] = useState<{ message: string; color: string } | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="text-6xl mb-6">🖋️</div>
        <h2 className="text-4xl font-bold mb-4">{selectedLevel} 학습 (2-2 훈/음 → 한자 쓰기)</h2>
        
        <div className="bg-white p-8 rounded-3xl shadow">
          <p className="text-2xl mb-8 font-medium">훈·음을 보고 한자를 써보세요</p>
          <div className="h-64 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mb-8">
            <p className="text-gray-400">한자 쓰기 영역 (추후 구현)</p>
          </div>

          <button 
            onClick={() => setFeedback({ message: "정답입니다! (스켈레톤)", color: 'text-green-600' })}
            className="w-full py-5 bg-indigo-600 text-white rounded-3xl text-xl font-medium mb-4"
          >
            제출하기
          </button>

          {feedback && (
            <div className={`text-3xl font-bold ${feedback.color}`}>
              {feedback.message}
            </div>
          )}
        </div>

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