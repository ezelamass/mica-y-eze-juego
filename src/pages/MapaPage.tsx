import { Hud } from "../ui/Hud";
import { MapView } from "../ui/Map";
import type { MicaState } from "../state/storage";

interface MapaPageProps {
  state: MicaState;
}

export function MapaPage({ state }: MapaPageProps) {
  return (
    <>
      <header className="app-header">
        <h1 className="app-title">Nuestro mapa</h1>
        <p className="app-subtitle">Cada casilla nos acerca a un lugar nuevo, de a poco.</p>
      </header>

      <div className="stack">
        <Hud coins={state.coins} xp={state.xp} streak={state.streak} />
        <MapView mapNode={state.mapNode} xp={state.xp} unlockedPlaces={state.unlockedPlaces} />
      </div>
    </>
  );
}
