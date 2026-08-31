import { useState } from "react";

// Compartido por memoria, mapaciego, impostor y personal: las cuatro son
// "elegí una opción de 4 y mostrá si acertaste al toque".
interface MultipleChoiceQuestionProps {
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  onFinish: (won: boolean) => void;
}

export function MultipleChoiceQuestion({
  prompt,
  options,
  correctIndex,
  onFinish,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const choose = (i: number) => {
    if (submitted) return;
    setSelected(i);
    setSubmitted(true);
    onFinish(i === correctIndex);
  };

  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        {prompt}
      </p>
      <div className="option-list">
        {options.map((opt, i) => {
          const classes = ["option"];
          if (submitted) {
            if (i === correctIndex) classes.push("correct");
            else if (i === selected) classes.push("wrong");
          } else if (i === selected) {
            classes.push("selected");
          }
          return (
            <button
              key={i}
              type="button"
              className={classes.join(" ")}
              disabled={submitted}
              onClick={() => choose(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
