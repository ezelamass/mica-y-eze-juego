import { useState } from "react";
import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";

type Move = "piedra" | "papel" | "tijera";
const MOVES: Move[] = ["piedra", "papel", "tijera"];
const EMOJI: Record<Move, string> = { piedra: "🪨", papel: "📄", tijera: "✂️" };

function beats(a: Move, b: Move): boolean {
  return (
    (a === "piedra" && b === "tijera") ||
    (a === "papel" && b === "piedra") ||
    (a === "tijera" && b === "papel")
  );
}

// Mejor de 3 contra la app. No usa contenido de ningún banco.
export function Ppt({ onFinish }: GameProps) {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [last, setLast] = useState<{ mine: Move; theirs: Move } | null>(null);
  const decided = wins === 2 || losses === 2;

  const play = (mine: Move) => {
    if (decided) return;
    const theirs = MOVES[Math.floor(Math.random() * MOVES.length)];
    const outcome = beats(mine, theirs) ? "win" : beats(theirs, mine) ? "lose" : "draw";
    const newWins = wins + (outcome === "win" ? 1 : 0);
    const newLosses = losses + (outcome === "lose" ? 1 : 0);

    setLast({ mine, theirs });
    setWins(newWins);
    setLosses(newLosses);

    if (newWins === 2) window.setTimeout(() => onFinish(true), 600);
    else if (newLosses === 2) window.setTimeout(() => onFinish(false), 600);
  };

  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        Mejor de 3 contra la app. Ganás {wins} · Perdés {losses}
      </p>
      {last && (
        <p className="center-text" style={{ margin: 0, fontSize: 32 }}>
          {EMOJI[last.mine]} vs {EMOJI[last.theirs]}
        </p>
      )}
      <div className="btn-row">
        {MOVES.map((m) => (
          <Button key={m} variant="ghost" onClick={() => play(m)} disabled={decided}>
            {EMOJI[m]}
          </Button>
        ))}
      </div>
    </div>
  );
}
