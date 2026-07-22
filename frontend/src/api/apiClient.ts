const API_BASE_URL = 'http://127.0.0.1:8000';

export interface QuestionResponse {
  hanja?: string;
  correct_hun_eum?: string;
  grade: string;
  method: string;
  options?: string[];
  correct_option?: string;
  error?: string;
}

export interface SubmitResult {
  status: string;
  correct: boolean;
  submitted: string;
  correct_answer: string;
  message: string;
  error?: string;
}

export const apiClient = {
  getNextQuestion: async (
    userId: string = 'default',
    selectedGrade: string,
    method: string = '1-1'
  ): Promise<QuestionResponse> => {
    const params = new URLSearchParams({
      user_id: userId,
      selected_grade: selectedGrade,
      method: method,
    });
    const res = await fetch(`${API_BASE_URL}/api/next-question?${params}`);
    if (!res.ok) throw new Error('Failed to fetch question');
    return res.json();
  },

  submitAnswer: async (
    user_id: string,
    hanja: string,
    grade: string,
    submitted: string,
    method: string = '1-1'
  ): Promise<SubmitResult> => {
    const response = await fetch(`${API_BASE_URL}/api/submit-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        hanja,
        grade,
        submitted,
        method,
      }),
    });

    if (!response.ok) {
      throw new Error('제출 실패');
    }
    return response.json();
  },
};