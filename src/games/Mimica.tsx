import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";
import type { MimicaPrompt } from "../data/memories";

const TIME_LIMIT = 60;

// Muestra una consigna por categoría + timer. Eze marca si acertó.
export function Mimica({ content, onFinish }: GameProps) {
  const data = content as MimicaPrompt;
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!revealed || done || secondsLeft <= 0) return;
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [revealed, secondsLeft, done]);

  const finish = (won: boolean) => {
    setDone(true);
    onFinish(won);
  };

  if (!revealed) {
    return (
      <div className="stack">
        <p className="dim" style={{ margin: 0 }}>
          Categoría: <b style={{ color: "var(--ink)" }}>{data.category}</b>. Mostrale la consigna
          solo a quien tiene que actuar.
        </p>
        <Button onClick={() => setRevealed(true)}>Mostrar consigna</Button>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="card center-text" style={{ background: "var(--surface-2)" }}>
        <span className="pill plum">{data.category}</span>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 26,
            margin: "10px 0 0",
          }}
        >
          {data.prompt}
        </p>
      </div>
      <p className="dim center-text" style={{ margin: 0 }}>
        {secondsLeft > 0 ? `${secondsLeft}s` : "¡Se acabó el tiempo!"}
      </p>
      <div className="btn-row">
        <Button variant="ghost" onClick={() => finish(false)}>
          No lo adivinó
        </Button>
        <Button variant="turq" onClick={() => finish(true)}>
          ¡Lo adivinó!
        </Button>
      </div>
    </div>
  );
}
