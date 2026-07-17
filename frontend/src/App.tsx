import { useState } from 'react'

function App() {
  const [selectedLevel, setSelectedLevel] = useState('8')
  const [mode, setMode] = useState<'menu' | 'study'>('menu')

  const levels = ['8', '7급II', '7', '6급II', '6', '5급II', '5', '4급II', '4', '3급II', '3', '2', '1']

  if (mode === 'study') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-6">📖</div>
          <h2 className="text-4xl font-bold mb-4">{selectedLevel}급 학습</h2>
          <p className="text-xl text-gray-600 mb-12">학습 모드를 준비하고 있습니다...</p>
          <button 
            onClick={() => setMode('menu')}
            className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-2xl text-lg"
          >
            ← 메뉴로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900">한자 학습</h1>
          <p className="text-gray-600 mt-2">한국어문회 한자능력검정시험 학습 도우미</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6">급수 선택</h2>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              현재 선택된 급수
            </label>
            
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full text-5xl font-bold text-center bg-transparent focus:outline-none cursor-pointer py-4 border-2 border-indigo-200 focus:border-indigo-500 rounded-2xl"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}급</option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <button 
            onClick={() => setMode('study')}
            className="w-full p-10 bg-white rounded-3xl border border-gray-100 hover:border-indigo-400 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-start gap-8">
              <div className="text-7xl flex-shrink-0">📝</div>
              <div>
                <h3 className="text-3xl font-semibold mb-3">한자 → 훈/음</h3>
                <p className="text-xl text-gray-600">한자를 보고 뜻과 음을 학습합니다</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setMode('study')}
            className="w-full p-10 bg-white rounded-3xl border border-gray-100 hover:border-indigo-400 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-start gap-8">
              <div className="text-7xl flex-shrink-0">✍️</div>
              <div>
                <h3 className="text-3xl font-semibold mb-3">훈/음 → 한자 쓰기</h3>
                <p className="text-xl text-gray-600">터치로 직접 한자를 써보는 연습 (주요 기능)</p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}

export default App