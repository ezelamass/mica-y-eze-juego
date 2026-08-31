interface HudProps {
  coins: number;
  xp: number;
  streak: number;
}

export function Hud({ coins, xp, streak }: HudProps) {
  return (
    <div className="hud">
      <div className="stat coin">
        <small>Monedas</small>
        <b>{coins}</b>
      </div>
      <div className="stat">
        <small>Experiencia</small>
        <b>{xp}</b>
      </div>
      <div className="stat">
        <small>Racha</small>
        <b>{streak}</b>
      </div>
    </div>
  );
}
