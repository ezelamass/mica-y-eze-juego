import type { GameProps } from "./GameProps";
import type { TriviaQuestion } from "../data/questions";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export function Personal({ content, onFinish }: GameProps) {
  const data = content as TriviaQuestion;
  return (
    <MultipleChoiceQuestion
      prompt={data.question}
      options={data.options}
      correctIndex={data.correctIndex}
      onFinish={onFinish}
    />
  );
}
