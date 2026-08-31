import { useState } from "react";
import { getGame } from "./data/games";
import type { GameId } from "./data/games";
import type { ShopItemId } from "./data/shop";
import { load, save, defaultState } from "./state/storage";
import type { MicaState } from "./state/storage";
import {
  ensureTodaysGame,
  resolveRound,
  resolveContent,
  rollDice,
  buyShopItem,
  buyCita,
  todayISO,
  forceGame,
  grantXp,
  grantCoins,
  forceDiceAvailable,
} from "./state/engine";
import type { RoundResult } from "./state/engine";
import { GAME_COMPONENTS } from "./games/registry";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { SettingsPanel } from "./ui/SettingsPanel";
import { BottomNav } from "./ui/BottomNav";
import { useRoute } from "./router";
import { useTestMode } from "./useTestMode";
import { HomePage } from "./pages/HomePage";
import { MapaPage } from "./pages/MapaPage";
import { TiendaPage } from "./pages/TiendaPage";

function loadInitialState(): MicaState {
  const loaded = load();
  const today = todayISO();
  const withGame =
    loaded.lastPlayedDate === today ? loaded : ensureTodaysGame(loaded, today);
  if (withGame !== loaded) save(withGame);
  return withGame;
}

export default function App() {
  const [state, setState] = useState<MicaState>(loadInitialState);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [bigGiftCelebration, setBigGiftCelebration] = useState(false);
  const [route, navigate] = useRoute();
  const [testMode, exitTestMode] = useTestMode();

  const today = todayISO();
  const alreadyPlayedToday = state.lastPlayedDate === today;

  function updateState(next: MicaState) {
    setState(next);
    save(next);
  }

  const handleFinish = (won: boolean) => {
    const { state: next, result } = resolveRound(state, won, today);
    updateState(next);
    setRoundResult(result);
  };

  const handleDiceRoll = () => {
    const { state: next, roll } = rollDice(state);
    updateState(next);
    return roll;
  };

  const handleBuyItem = (id: ShopItemId) => {
    const next = buyShopItem(state, id);
    if (!next) return;
    updateState(next);
    if (id === "regalogrande") setBigGiftCelebration(true);
  };

  const handleBuyCita = (placeId: string) => {
    const next = buyCita(state, placeId);
    if (next) updateState(next);
  };

  const handleForceGame = (id: GameId) => {
    updateState(forceGame(state, id, today));
    setRoundResult(null);
  };

  const handleGrantCoins = (amount: number) => updateState(grantCoins(state, amount));
  const handleGrantXp = (amount: number) => updateState(grantXp(state, amount));
  const handleForceDice = () => updateState(forceDiceAvailable(state));

  const handleResetProgress = () => {
    const fresh = ensureTodaysGame(defaultState(), today);
    updateState(fresh);
    setRoundResult(null);
  };

  const game = state.todaysGame ? getGame(state.todaysGame.gameId) : null;
  const GameComponent = game ? GAME_COMPONENTS[game.id] : null;
  const content =
    game && state.todaysGame
      ? game.kind === "board"
        ? game.name
        : resolveContent(game.id, state.todaysGame.contentIds)
      : null;

  return (
    <div className="app-shell">
      <SettingsPanel state={state} />

      {testMode && (
        <div className="test-banner">
          🧪 Modo test activo — esto no es lo que ve Mica.
          <button type="button" className="test-banner-exit" onClick={exitTestMode}>
            Salir
          </button>
        </div>
      )}

      {route === "/mapa" ? (
        <MapaPage state={state} />
      ) : route === "/tienda" ? (
        <TiendaPage state={state} onBuyItem={handleBuyItem} onBuyCita={handleBuyCita} />
      ) : (
        <HomePage
          state={state}
          game={game}
          GameComponent={GameComponent}
          content={content}
          alreadyPlayedToday={alreadyPlayedToday}
          roundResult={roundResult}
          onFinish={handleFinish}
          onDismissResult={() => setRoundResult(null)}
          onDiceRoll={handleDiceRoll}
          testMode={testMode}
          onForceGame={handleForceGame}
          onGrantCoins={handleGrantCoins}
          onGrantXp={handleGrantXp}
          onForceDice={handleForceDice}
          onResetProgress={handleResetProgress}
        />
      )}

      <BottomNav route={route} onNavigate={navigate} />

      {bigGiftCelebration && (
        <Modal
          title="¡Te ganaste el regalo grande!"
          onClose={() => setBigGiftCelebration(false)}
          actions={<Button onClick={() => setBigGiftCelebration(false)}>Cerrar</Button>}
        >
          <p>Después de tanto jugar, te lo ganaste. Ahora te lo doy. 🎁</p>
        </Modal>
      )}
    </div>
  );
}
