export interface Alternative {
  text: string;
  correct: boolean;
  image?: string;
}

export interface Props {
  id?: string;
  title?: string;
  type?: "SENTENCE" | "SELECT";
  score?: number;
  alternatives?: Alternative[];
  onChange: (alternative: Alternative) => void;
}
