import { Button } from "../ui/Button";
import type { GameProps } from "./GameProps";

// Se juegan físicamente; la app solo pregunta quién ganó. App.tsx pasa el
// nombre del juego de mesa como "content" (un string).
export function BoardGame({ content, onFinish }: GameProps) {
  const name = content as string;
  return (
    <div className="stack">
      <p className="dim" style={{ margin: 0 }}>
        Juego de mesa: <b style={{ color: "var(--ink)" }}>{name}</b>. Juéguenlo en persona y
        después carguen quién ganó.
      </p>
      <div className="btn-row">
        <Button variant="ghost" onClick={() => onFinish(false)}>
          Ganó Eze
        </Button>
        <Button variant="turq" onClick={() => onFinish(true)}>
          Ganó Mica
        </Button>
      </div>
    </div>
  );
}
