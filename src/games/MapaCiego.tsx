import type { GameProps } from "./GameProps";
import type { MapaCiegoContent } from "../data/memories";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export function MapaCiego({ content, onFinish }: GameProps) {
  const data = content as MapaCiegoContent;
  return (
    <MultipleChoiceQuestion
      prompt={data.clue}
      options={data.options}
      correctIndex={data.correctIndex}
      onFinish={onFinish}
    />
  );
}
