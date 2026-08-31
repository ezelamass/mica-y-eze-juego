import { Card } from "./Card";
import { Pill } from "./Pill";
import { PLACES } from "../data/places";

const MAP_LENGTH = 30;
const XP_PER_NODE = 25;

interface MapViewProps {
  mapNode: number;
  xp: number;
  unlockedPlaces: string[];
}

export function MapView({ mapNode, xp, unlockedPlaces }: MapViewProps) {
  const nodes = Array.from({ length: MAP_LENGTH }, (_, i) => i + 1);
  const nextPlace = PLACES.find((p) => !unlockedPlaces.includes(p.id));
  const nextNodeXp = nextPlace ? nextPlace.unlockNode * XP_PER_NODE : null;
  const unlocked = PLACES.filter((p) => unlockedPlaces.includes(p.id));

  return (
    <Card>
      <div className="card-row">
        <Pill tone="plum">
          Casilla {mapNode} de {MAP_LENGTH}
        </Pill>
      </div>
      <p className="dim" style={{ marginTop: 0 }}>
        Cada casilla violeta te desbloquea un lugar de Buenos Aires al que todavía no fuimos.
      </p>
      <div className="map-grid" style={{ marginTop: 12 }}>
        {nodes.map((n) => {
          const classes = ["node"];
          if (n < mapNode) classes.push("done");
          if (n === mapNode) classes.push("here");
          if (n % 5 === 0) classes.push("prize");
          return (
            <div key={n} className={classes.join(" ")}>
              {n}
            </div>
          );
        })}
      </div>
      <div className="map-footer">
        {nextPlace && nextNodeXp !== null ? (
          <>
            <b>Próximo destino: casilla {nextPlace.unlockNode}</b>
            <p className="dim" style={{ marginTop: 2 }}>
              Faltan {Math.max(0, nextNodeXp - xp)} XP para descubrirlo.
            </p>
          </>
        ) : (
          <b>¡Recorrimos todo el mapa!</b>
        )}
      </div>
      {unlocked.length > 0 && (
        <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
          <p className="dim" style={{ margin: "0 0 2px", fontWeight: 600 }}>
            Ya desbloqueamos:
          </p>
          {unlocked.map((p) => (
            <p key={p.id} className="dim" style={{ margin: 0 }}>
              <b style={{ color: "var(--ink)" }}>{p.name}</b> — {p.description}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
