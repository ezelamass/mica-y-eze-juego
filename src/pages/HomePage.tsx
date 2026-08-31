import type { ComponentType } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { Hud } from "../ui/Hud";
import { Dice } from "../ui/Dice";
import { TestPanel } from "../ui/TestPanel";
import type { MicaState } from "../state/storage";
import type { RoundResult, DiceRoll } from "../state/engine";
import type { GameDef, GameId } from "../data/games";
import type { GameProps } from "../games/GameProps";

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
            Te tocó esta prenda del mazo:
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
          Te desbloqueaste un destino nuevo en el mapa:{" "}
          {result.newlyUnlockedPlaces.map((p) => p.name).join(", ")}
        </p>
      )}
      {result.diceUnlocked && (
        <p className="dim" style={{ margin: 0 }}>
          Tenés una tirada de dado bonus esperándote.
        </p>
      )}

      <Button onClick={onContinue}>Seguir</Button>
    </Card>
  );
}

interface HomePageProps {
  state: MicaState;
  game: GameDef | null;
  GameComponent: ComponentType<GameProps> | null;
  content: unknown;
  alreadyPlayedToday: boolean;
  roundResult: RoundResult | null;
  onFinish: (won: boolean) => void;
  onDismissResult: () => void;
  onDiceRoll: () => DiceRoll;
  testMode: boolean;
  onForceGame: (id: GameId) => void;
  onGrantCoins: (amount: number) => void;
  onGrantXp: (amount: number) => void;
  onForceDice: () => void;
  onResetProgress: () => void;
}

export function HomePage({
  state,
  game,
  GameComponent,
  content,
  alreadyPlayedToday,
  roundResult,
  onFinish,
  onDismissResult,
  onDiceRoll,
  testMode,
  onForceGame,
  onGrantCoins,
  onGrantXp,
  onForceDice,
  onResetProgress,
}: HomePageProps) {
  return (
    <>
      <header className="app-header">
        <h1 className="app-title">El juego de Micaela</h1>
        <p className="app-subtitle">
          Armé esto para nosotros: un juego por día. Ganás vos, sumamos los dos.
        </p>
      </header>

      <div className="stack">
        <Hud coins={state.coins} xp={state.xp} streak={state.streak} />

        {testMode && (
          <TestPanel
            onForceGame={onForceGame}
            onGrantCoins={onGrantCoins}
            onGrantXp={onGrantXp}
            onForceDice={onForceDice}
            onReset={onResetProgress}
          />
        )}

        <Dice available={state.diceAvailable} onRoll={onDiceRoll} />

        {roundResult ? (
          <ResultCard result={roundResult} onContinue={onDismissResult} />
        ) : !testMode && alreadyPlayedToday ? (
          <Card>
            <h2>Ya jugamos hoy</h2>
            <p className="dim">Nos vemos mañana. El día que no jugamos, se pierde.</p>
          </Card>
        ) : game && GameComponent ? (
          <Card>
            <div className="card-row">
              <h2>Hoy te toca: {game.name}</h2>
              <Pill>
                {game.coins} moneda{game.coins === 1 ? "" : "s"}
              </Pill>
            </div>
            <GameComponent content={content} onFinish={onFinish} />
          </Card>
        ) : null}
      </div>
    </>
  );
}
