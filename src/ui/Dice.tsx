import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import type { DiceRoll } from "../state/engine";

interface DiceProps {
  available: boolean;
  onRoll: () => DiceRoll;
}

export function Dice({ available, onRoll }: DiceProps) {
  const [result, setResult] = useState<DiceRoll | null>(null);
  const [rolling, setRolling] = useState(false);

  if (!available && !result) return null;

  const handleRoll = () => {
    setRolling(true);
    window.setTimeout(() => {
      setResult(onRoll());
      setRolling(false);
    }, 400);
  };

  return (
    <Card>
      <h2>Tirada bonus</h2>
      <p className="dim">Cada 3 días jugados, además del juego del día.</p>
      <div className="dice-row" style={{ marginTop: 14 }}>
        <div className={`die ${rolling ? "rolling" : ""}`}>{result ? result.face : "?"}</div>
        <div style={{ flex: 1 }}>
          {result ? (
            <>
              <b style={{ fontSize: 15 }}>
                {[
                  result.coins > 0 ? `+${result.coins} monedas` : null,
                  result.xp > 0 ? `+${result.xp} XP` : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </b>
              <p className="dim" style={{ margin: "2px 0 0" }}>
                Tirada usada.
              </p>
            </>
          ) : (
            <Button small onClick={handleRoll} disabled={rolling}>
              Tirar el dado
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
