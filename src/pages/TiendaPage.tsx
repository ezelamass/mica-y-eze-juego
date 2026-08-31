import { Hud } from "../ui/Hud";
import { Shop } from "../ui/Shop";
import type { MicaState } from "../state/storage";
import type { ShopItemId } from "../data/shop";

interface TiendaPageProps {
  state: MicaState;
  onBuyItem: (id: ShopItemId) => void;
  onBuyCita: (placeId: string) => void;
}

export function TiendaPage({ state, onBuyItem, onBuyCita }: TiendaPageProps) {
  return (
    <>
      <header className="app-header">
        <h1 className="app-title">Tu tienda</h1>
        <p className="app-subtitle">
          Todo lo que fuiste ganando, para canjear cuando quieras.
        </p>
      </header>

      <div className="stack">
        <Hud coins={state.coins} xp={state.xp} streak={state.streak} />
        <Shop state={state} onBuyItem={onBuyItem} onBuyCita={onBuyCita} />
      </div>
    </>
  );
}
