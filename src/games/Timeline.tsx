import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";
import type { TimelineSet } from "../data/memories";

const TIME_LIMIT = 30;

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 5 fotos desordenadas, ordenarlas cronológicamente contra reloj.
export function Timeline({ content, onFinish }: GameProps) {
  const set = content as TimelineSet;
  const correctOrder = set.items.map((it) => it.caption);
  const [order, setOrder] = useState(() => shuffle(correctOrder));
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT);
  const orderRef = useRef(order);
  orderRef.current = order;

  const finish = (finalOrder: string[]) => {
    if (submitted) return;
    const won = finalOrder.every((caption, i) => caption === correctOrder[i]);
    setSubmitted(true);
    onFinish(won);
  };

  useEffect(() => {
    if (submitted) return;
    if (secondsLeft <= 0) {
      finish(orderRef.current);
      return;
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [secondsLeft, submitted]);

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  return (
    <div className="stack">
      <div className="card-row" style={{ marginBottom: 0 }}>
        <p className="dim" style={{ margin: 0 }}>
          Ordená del más viejo al más nuevo.
        </p>
        <span className="pill">{Math.max(0, secondsLeft)}s</span>
      </div>
      <div className="option-list">
        {order.map((caption, i) => (
          <div
            key={caption}
            className="option"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "default",
            }}
          >
            <span>
              {i + 1}. {caption}
            </span>
            <span className="btn-row" style={{ width: "auto" }}>
              <button
                type="button"
                className="btn ghost small"
                disabled={submitted}
                onClick={() => move(i, -1)}
                aria-label="Subir"
              >
                ↑
              </button>
              <button
                type="button"
                className="btn ghost small"
                disabled={submitted}
                onClick={() => move(i, 1)}
                aria-label="Bajar"
              >
                ↓
              </button>
            </span>
          </div>
        ))}
      </div>
      <Button onClick={() => finish(order)} disabled={submitted}>
        Confirmar orden
      </Button>
    </div>
  );
}
