import type { GameProps } from "./GameProps";
import type { MemoriaContent } from "../data/memories";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export function Memoria({ content, onFinish }: GameProps) {
  const data = content as MemoriaContent;
  return (
    <MultipleChoiceQuestion
      prompt={data.question}
      options={data.options}
      correctIndex={data.correctIndex}
      onFinish={onFinish}
    />
  );
}
