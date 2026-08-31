import type { GameProps } from "./GameProps";
import type { ImpostorContent } from "../data/memories";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export function Impostor({ content, onFinish }: GameProps) {
  const data = content as ImpostorContent;
  return (
    <MultipleChoiceQuestion
      prompt="3 son verdaderas y 1 es falsa. Encontrá la falsa."
      options={data.statements}
      correctIndex={data.falseIndex}
      onFinish={onFinish}
    />
  );
}
