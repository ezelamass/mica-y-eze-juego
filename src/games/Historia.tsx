import { useState } from "react";
import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";
import type { HistoriaStarter } from "../data/memories";

// Texto de arranque, ella escribe qué pasó después. Lo valida Eze con un botón.
export function Historia({ content, onFinish }: GameProps) {
  const data = content as HistoriaStarter;
  const [answer, setAnswer] = useState("");
  const [reviewing, setReviewing] = useState(false);

  if (reviewing) {
    return (
      <div className="stack">
        <p className="dim" style={{ margin: 0 }}>
          Eze: ¿le pegó a lo que pasó de verdad?
        </p>
        <blockquote style={{ margin: 0, fontStyle: "italic", color: "var(--ink)" }}>
          “{answer}”
        </blockquote>
        <div className="btn-row">
          <Button variant="ghost" onClick={() => onFinish(false)}>
            No, esta vez no
          </Button>
          <Button variant="turq" onClick={() => onFinish(true)}>
            Sí, acertó
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        {data.text}
      </p>
      <textarea
        className="answer"
        placeholder="Escribí qué pasó después"
        aria-label="Tu respuesta"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={() => setReviewing(true)} disabled={!answer.trim()}>
        Listo
      </Button>
    </div>
  );
}
