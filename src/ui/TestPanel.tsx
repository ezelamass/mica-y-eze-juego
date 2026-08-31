import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { DIGITAL_GAMES, BOARD_GAMES } from "../data/games";
import type { GameId } from "../data/games";

interface TestPanelProps {
  onForceGame: (id: GameId) => void;
  onGrantCoins: (amount: number) => void;
  onGrantXp: (amount: number) => void;
  onForceDice: () => void;
  onReset: () => void;
}

export function TestPanel({
  onForceGame,
  onGrantCoins,
  onGrantXp,
  onForceDice,
  onReset,
}: TestPanelProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Card className="test-card">
      <h2 style={{ color: "var(--coral-soft)" }}>🧪 Modo test</h2>
      <p className="dim" style={{ marginTop: 4 }}>
        Esto no lo va a ver Mica. Elegí cualquier juego para probarlo, sin esperar al sorteo ni
        al día que viene.
      </p>

      <p className="test-label">Minijuegos digitales</p>
      <div className="test-grid">
        {DIGITAL_GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            className="btn ghost small"
            onClick={() => onForceGame(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <p className="test-label">Juegos de mesa</p>
      <div className="test-grid">
        {BOARD_GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            className="btn ghost small"
            onClick={() => onForceGame(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <p className="test-label">Atajos</p>
      <div className="test-grid">
        <button type="button" className="btn ghost small" onClick={() => onGrantCoins(50)}>
          +50 monedas
        </button>
        <button type="button" className="btn ghost small" onClick={() => onGrantXp(150)}>
          +150 XP
        </button>
        <button type="button" className="btn ghost small" onClick={onForceDice}>
          Habilitar dado
        </button>
        <button
          type="button"
          className="btn ghost small"
          onClick={() => setConfirmReset(true)}
        >
          Reiniciar progreso
        </button>
      </div>

      {confirmReset && (
        <Modal
          title="¿Reiniciar todo el progreso?"
          onClose={() => setConfirmReset(false)}
          actions={
            <>
              <Button variant="ghost" small onClick={() => setConfirmReset(false)}>
                Cancelar
              </Button>
              <Button small onClick={() => { onReset(); setConfirmReset(false); }}>
                Reiniciar
              </Button>
            </>
          }
        >
          <p>
            Borra monedas, XP, mapa, racha y todo lo demás. Es solo para dejarlo limpio antes de
            que juegue Mica de verdad.
          </p>
        </Modal>
      )}
    </Card>
  );
}
