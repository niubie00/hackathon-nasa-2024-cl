import { Lesson, Result } from "../Challenges/types";

export interface Props {
  lesson: Lesson;
  course: any;
  results: Result[];
  onRestart: () => void;
}
