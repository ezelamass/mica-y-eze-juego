import { useState } from "react";
import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";
import type { EmojiMemory } from "../data/memories";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Recuerdo en emojis: match flexible (minúsculas, sin tildes, o cualquier
// keyword alternativa cuenta como acierto).
export function Emoji({ content, onFinish }: GameProps) {
  const memory = content as EmojiMemory;
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const check = () => {
    if (submitted || !value.trim()) return;
    const answer = normalize(value);
    const target = normalize(memory.answer);
    const won =
      answer === target || memory.keywords.some((k) => answer.includes(normalize(k)));
    setSubmitted(true);
    onFinish(won);
  };

  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        Adiviná qué recuerdo es. Tenés un intento.
      </p>
      <div className="emojis">{memory.emojis}</div>
      <input
        className="answer"
        placeholder="Escribí tu respuesta"
        aria-label="Tu respuesta"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={submitted}
        onKeyDown={(e) => e.key === "Enter" && check()}
      />
      <Button onClick={check} disabled={submitted || !value.trim()}>
        Responder
      </Button>
    </div>
  );
}
