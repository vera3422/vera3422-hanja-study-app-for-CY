export type LearningMethodId = "1-1" | "1-2" | "2-1" | "2-2";

export interface QuestionResponse {
  hanja?: string;
  question_text?: string;
  options?: string[];
  correct_option?: string;
  correct_hun_eum?: string;
  grade: string;
  method: LearningMethodId;
}

export interface SubmitResult {
  status: string;
  correct: boolean;
  submitted: string;
  correct_answer: string;
  message: string;
}