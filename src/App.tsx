import { useState } from "react";
import { getGame } from "./data/games";
import type { ShopItemId } from "./data/shop";
import { load, save } from "./state/storage";
import type { MicaState } from "./state/storage";
import {
  ensureTodaysGame,
  resolveRound,
  resolveContent,
  rollDice,
  buyShopItem,
  buyCita,
  todayISO,
} from "./state/engine";
import type { RoundResult } from "./state/engine";
import { GAME_COMPONENTS } from "./games/registry";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Pill } from "./ui/Pill";
import { Modal } from "./ui/Modal";
import { Hud } from "./ui/Hud";
import { MapView } from "./ui/Map";
import { Shop } from "./ui/Shop";
import { Dice } from "./ui/Dice";
import { SettingsPanel } from "./ui/SettingsPanel";

function ResultCard({
  result,
  onContinue,
}: {
  result: RoundResult;
  onContinue: () => void;
}) {
  return (
    <Card className={`result ${result.won ? "win" : "lose"}`}>
      <p className="big">{result.won ? "¡Le pegaste!" : "Perdiste"}</p>

      {result.won ? (
        <div className="gain">
          <span>
            +{result.coinsGained} moneda{result.coinsGained === 1 ? "" : "s"}
          </span>
          <span>+{result.xpGained} XP</span>
          {result.streakBonusCoins > 0 && <span>+{result.streakBonusCoins} racha</span>}
        </div>
      ) : (
        <>
          <p className="dim" style={{ margin: 0 }}>
            Sacaste una prenda del mazo:
          </p>
          <div className="prenda-reveal">
            <div className="prenda-icon">🎲</div>
            <p>{result.prenda?.text}</p>
          </div>
          <div className="gain">
            <span>+{result.xpGained} XP</span>
          </div>
        </>
      )}

      {result.newlyUnlockedPlaces.length > 0 && (
        <p className="dim" style={{ margin: 0 }}>
          Nuevo destino en el mapa: {result.newlyUnlockedPlaces.map((p) => p.name).join(", ")}
        </p>
      )}
      {result.diceUnlocked && (
        <p className="dim" style={{ margin: 0 }}>
          Se habilitó una tirada de dado bonus.
        </p>
      )}

      <Button onClick={onContinue}>Continuar</Button>
    </Card>
  );
}

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

      <header className="app-header">
        <h1 className="app-title">El juego de Micaela</h1>
      </header>

      <div className="stack">
        <Hud coins={state.coins} xp={state.xp} streak={state.streak} />

        <Dice available={state.diceAvailable} onRoll={handleDiceRoll} />

        {roundResult ? (
          <ResultCard result={roundResult} onContinue={() => setRoundResult(null)} />
        ) : alreadyPlayedToday ? (
          <Card>
            <h2>Ya jugaste hoy</h2>
            <p className="dim">Volvé mañana. El día que no juegan, se pierde.</p>
          </Card>
        ) : game && GameComponent ? (
          <Card>
            <div className="card-row">
              <h2>Hoy toca: {game.name}</h2>
              <Pill>
                {game.coins} moneda{game.coins === 1 ? "" : "s"}
              </Pill>
            </div>
            <GameComponent content={content} onFinish={handleFinish} />
          </Card>
        ) : null}

        <MapView mapNode={state.mapNode} xp={state.xp} unlockedPlaces={state.unlockedPlaces} />

        <Shop state={state} onBuyItem={handleBuyItem} onBuyCita={handleBuyCita} />
      </div>

      {bigGiftCelebration && (
        <Modal
          title="¡Se ganó el regalo grande!"
          onClose={() => setBigGiftCelebration(false)}
          actions={
            <Button onClick={() => setBigGiftCelebration(false)}>Cerrar</Button>
          }
        >
          <p>Después de tanto jugar, se lo ganó. Hora de dárselo. 🎁</p>
        </Modal>
      )}
    </div>
  );
}
