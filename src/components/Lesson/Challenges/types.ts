import { Props as SelectProps } from "./Select/types";
import { Props as SentenceProps } from "./Sentence/types";

export type ChallengeProps = Partial<SelectProps> & Partial<SentenceProps>;

export interface Challenge extends ChallengeProps {}

export interface Lesson {
  id: string;
  name: string;
  description: string;
  image: string;
  cover: string;
  color?: string;
  level?: number;
  challenges: Challenge[];
  sessions?: any[];
}

export interface Props {
  course: any;
  lesson: Lesson;
  onFinish: (results: Result[]) => void;
}

export interface Result {
  challengeId?: string;
  score?: number;
  isCorrect?: boolean;
}
