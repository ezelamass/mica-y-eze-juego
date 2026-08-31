import { useState } from "react";
import type { GameProps } from "./GameProps";
import type { TriviaQuestion } from "../data/questions";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

const NEEDED_CORRECT = 4;

// 5 preguntas, 4 correctas para ganar.
export function Friends({ content, onFinish }: GameProps) {
  const questions = content as TriviaQuestion[];
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[index];
  if (!question) return null;

  const handleAnswer = (won: boolean) => {
    const total = correctCount + (won ? 1 : 0);
    if (index + 1 >= questions.length) {
      onFinish(total >= NEEDED_CORRECT);
      return;
    }
    setCorrectCount(total);
    setIndex(index + 1);
  };

  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        Pregunta {index + 1} de {questions.length} · necesitás {NEEDED_CORRECT} correctas
      </p>
      <MultipleChoiceQuestion
        key={question.id}
        prompt={question.question}
        options={question.options}
        correctIndex={question.correctIndex}
        onFinish={handleAnswer}
      />
    </div>
  );
}
