// Sorteo del juego del día, resolución de la ronda (economía, XP, mapa,
// prendas, dado) y compras de la tienda. Funciones puras: reciben estado,
// devuelven estado nuevo. App.tsx es el único que las llama y persiste el
// resultado con storage.ts.

import { ALL_GAMES, getGame, type GameDef, type GameId } from "../data/games";
import {
  EMOJI_MEMORIES,
  TIMELINE_SETS,
  MEMORIA_CONTENT,
  HISTORIA_STARTERS,
  MAPACIEGO_CONTENT,
  IMPOSTOR_CONTENT,
  MIMICA_PROMPTS,
} from "../data/memories";
import { FRIENDS_QUESTIONS, PERSONAL_QUESTIONS } from "../data/questions";
import { PRENDAS, type Prenda } from "../data/prendas";
import { PLACES, type Place } from "../data/places";
import { SHOP_ITEMS, CITA_PRICE, type ShopItemId } from "../data/shop";
import type { MicaState, LogEntry } from "./storage";

export function todayISO(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(aISO: string, bISO: string): number {
  const a = new Date(`${aISO}T00:00:00`);
  const b = new Date(`${bISO}T00:00:00`);
  return Math.round((a.getTime() - b.getTime()) / 86_400_000);
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CONTENT_POOLS: Partial<Record<GameId, { id: number }[]>> = {
  emoji: EMOJI_MEMORIES,
  timeline: TIMELINE_SETS,
  memoria: MEMORIA_CONTENT,
  historia: HISTORIA_STARTERS,
  mapaciego: MAPACIEGO_CONTENT,
  impostor: IMPOSTOR_CONTENT,
  personal: PERSONAL_QUESTIONS,
  mimica: MIMICA_PROMPTS,
};

const FRIENDS_ROUND_SIZE = 5;

/** Elige contenido sin usar para un juego. null = agotado por hoy. */
function pickContentIds(gameId: GameId, used: number[]): number[] | null {
  if (gameId === "friends") {
    const unused = FRIENDS_QUESTIONS.filter((q) => !used.includes(q.id));
    if (unused.length < FRIENDS_ROUND_SIZE) return null;
    return shuffle(unused)
      .slice(0, FRIENDS_ROUND_SIZE)
      .map((q) => q.id);
  }
  const pool = CONTENT_POOLS[gameId];
  if (!pool) return []; // ppt y juegos de mesa: no usan banco de contenido
  const unused = pool.filter((c) => !used.includes(c.id));
  if (unused.length === 0) return null;
  return [pickRandom(unused).id];
}

/** Resuelve los ids de contenido de hoy al objeto real que consume cada minijuego. */
export function resolveContent(gameId: GameId, contentIds: number[]): unknown {
  switch (gameId) {
    case "emoji":
      return EMOJI_MEMORIES.find((c) => c.id === contentIds[0]) ?? null;
    case "timeline":
      return TIMELINE_SETS.find((c) => c.id === contentIds[0]) ?? null;
    case "memoria":
      return MEMORIA_CONTENT.find((c) => c.id === contentIds[0]) ?? null;
    case "historia":
      return HISTORIA_STARTERS.find((c) => c.id === contentIds[0]) ?? null;
    case "mapaciego":
      return MAPACIEGO_CONTENT.find((c) => c.id === contentIds[0]) ?? null;
    case "impostor":
      return IMPOSTOR_CONTENT.find((c) => c.id === contentIds[0]) ?? null;
    case "personal":
      return PERSONAL_QUESTIONS.find((c) => c.id === contentIds[0]) ?? null;
    case "mimica":
      return MIMICA_PROMPTS.find((c) => c.id === contentIds[0]) ?? null;
    case "friends":
      return FRIENDS_QUESTIONS.filter((q) => contentIds.includes(q.id));
    default:
      return null; // ppt, juegos de mesa
  }
}

const BOARD_GAME_COOLDOWN_DAYS = 7;
const RECENT_GAMES_WINDOW = 3;
const DICE_EVERY_N_DAYS = 3;
const STREAK_BONUS_EVERY = 7;
const STREAK_BONUS_COINS = 3;
const XP_PER_MAP_NODE = 25;
const MAP_LENGTH = 30;
const CONSOLATION_XP = 5;

/**
 * Algoritmo del sorteo (spec 4): si ya hay un juego elegido para hoy, lo
 * reusa tal cual (recargar la página no debe cambiar el juego). Si no,
 * sortea uno nuevo y lo persiste con la fecha de hoy.
 */
export function ensureTodaysGame(state: MicaState, today: string): MicaState {
  if (state.todaysGame?.date === today) return state;

  let pool = ALL_GAMES.filter((g) => !state.recentGames.includes(g.id));
  if (
    state.lastBoardGameDate &&
    daysBetween(today, state.lastBoardGameDate) < BOARD_GAME_COOLDOWN_DAYS
  ) {
    pool = pool.filter((g) => g.kind !== "board");
  }
  if (pool.length === 0) pool = ALL_GAMES;

  let chosen: GameDef | null = null;
  let contentIds: number[] | null = null;
  let candidates = [...pool];
  while (candidates.length > 0) {
    const game = pickRandom(candidates);
    const used = state.usedContent[game.id] ?? [];
    const ids = pickContentIds(game.id, used);
    if (ids !== null) {
      chosen = game;
      contentIds = ids;
      break;
    }
    candidates = candidates.filter((g) => g.id !== game.id);
  }

  // Fallback defensivo: ppt no depende de ningún banco de contenido, así
  // que siempre puede jugarse. Evita que la app se rompa si algún día todos
  // los bancos quedan agotados a la vez.
  if (!chosen) {
    chosen = getGame("ppt");
    contentIds = [];
  }

  return {
    ...state,
    todaysGame: { date: today, gameId: chosen.id, contentIds: contentIds ?? [] },
  };
}

function drawPrenda(used: number[]): { prenda: Prenda; usedPrendas: number[] } {
  const exhausted = used.length >= PRENDAS.length;
  const base = exhausted ? [] : used;
  const available = PRENDAS.filter((p) => !base.includes(p.id));
  const prenda = pickRandom(available);
  return { prenda, usedPrendas: [...base, prenda.id] };
}

function unlockNewPlaces(
  unlockedPlaces: string[],
  prevMapNode: number,
  newMapNode: number
): { unlockedPlaces: string[]; newlyUnlocked: Place[] } {
  const newlyUnlocked = PLACES.filter(
    (p) => p.unlockNode > prevMapNode && p.unlockNode <= newMapNode
  );
  const ids = newlyUnlocked.map((p) => p.id).filter((id) => !unlockedPlaces.includes(id));
  return { unlockedPlaces: [...unlockedPlaces, ...ids], newlyUnlocked };
}

export interface RoundResult {
  game: GameDef;
  won: boolean;
  coinsGained: number;
  xpGained: number;
  streakBonusCoins: number;
  streak: number;
  prenda: Prenda | null;
  diceUnlocked: boolean;
  newlyUnlockedPlaces: Place[];
}

/** Aplica el resultado de la ronda de hoy: economía, XP, mapa, prendas, dado. */
export function resolveRound(
  state: MicaState,
  won: boolean,
  today: string
): { state: MicaState; result: RoundResult } {
  if (!state.todaysGame || state.todaysGame.date !== today) {
    throw new Error("No hay un juego del día vigente para resolver.");
  }
  const game = getGame(state.todaysGame.gameId);

  const coinsGained = won ? game.coins : 0;
  const xpGained = won ? game.xp : CONSOLATION_XP;
  const { prenda, usedPrendas } = won
    ? { prenda: null as Prenda | null, usedPrendas: state.usedPrendas }
    : drawPrenda(state.usedPrendas);

  const streak =
    state.lastPlayedDate && daysBetween(today, state.lastPlayedDate) === 1
      ? state.streak + 1
      : 1;
  const streakBonusCoins = streak % STREAK_BONUS_EVERY === 0 ? STREAK_BONUS_COINS : 0;

  const xp = state.xp + xpGained;
  const coins = state.coins + coinsGained + streakBonusCoins;

  const mapNode = Math.min(MAP_LENGTH, Math.floor(xp / XP_PER_MAP_NODE));
  const { unlockedPlaces, newlyUnlocked } = unlockNewPlaces(
    state.unlockedPlaces,
    state.mapNode,
    mapNode
  );

  const recentGames = [...state.recentGames, game.id].slice(-RECENT_GAMES_WINDOW);

  const usedContent = { ...state.usedContent };
  if (state.todaysGame.contentIds.length > 0) {
    const prev = usedContent[game.id] ?? [];
    usedContent[game.id] = [...prev, ...state.todaysGame.contentIds];
  }

  let diceCounter = state.diceCounter + 1;
  let diceAvailable = state.diceAvailable;
  let diceUnlocked = false;
  if (diceCounter >= DICE_EVERY_N_DAYS) {
    diceCounter = 0;
    diceAvailable = true;
    diceUnlocked = true;
  }

  const lastBoardGameDate = game.kind === "board" ? today : state.lastBoardGameDate;

  const log: LogEntry[] = [
    ...state.log,
    { date: today, game: game.id, won, coins: coinsGained + streakBonusCoins, xp: xpGained },
  ];

  const newState: MicaState = {
    ...state,
    coins,
    xp,
    streak,
    lastPlayedDate: today,
    lastBoardGameDate,
    recentGames,
    diceCounter,
    diceAvailable,
    usedPrendas,
    usedContent,
    unlockedPlaces,
    mapNode,
    log,
  };

  return {
    state: newState,
    result: {
      game,
      won,
      coinsGained,
      xpGained,
      streakBonusCoins,
      streak,
      prenda,
      diceUnlocked,
      newlyUnlockedPlaces: newlyUnlocked,
    },
  };
}

export interface DiceRoll {
  face: number;
  coins: number;
  xp: number;
}

const DICE_FACES: DiceRoll[] = [
  { face: 1, coins: 1, xp: 0 },
  { face: 2, coins: 0, xp: 10 },
  { face: 3, coins: 2, xp: 0 },
  { face: 4, coins: 1, xp: 10 },
  { face: 5, coins: 0, xp: 15 },
  { face: 6, coins: 3, xp: 0 },
];

/** Tirada bonus: además del juego del día, cada 3 días jugados. */
export function rollDice(state: MicaState): { state: MicaState; roll: DiceRoll } {
  const roll = pickRandom(DICE_FACES);
  const xp = state.xp + roll.xp;
  const mapNode = Math.min(MAP_LENGTH, Math.floor(xp / XP_PER_MAP_NODE));
  const { unlockedPlaces } = unlockNewPlaces(state.unlockedPlaces, state.mapNode, mapNode);

  return {
    state: {
      ...state,
      coins: state.coins + roll.coins,
      xp,
      mapNode,
      unlockedPlaces,
      diceAvailable: false,
    },
    roll,
  };
}

export function buyShopItem(state: MicaState, itemId: ShopItemId): MicaState | null {
  const item = SHOP_ITEMS.find((i) => i.id === itemId);
  if (!item) return null;
  if (item.oneTime && state.purchased.includes(itemId)) return null;
  if (state.coins < item.price) return null;
  return { ...state, coins: state.coins - item.price, purchased: [...state.purchased, itemId] };
}

export function buyCita(state: MicaState, placeId: string): MicaState | null {
  if (!state.unlockedPlaces.includes(placeId)) return null;
  if (state.claimedPlaces.includes(placeId)) return null;
  if (state.coins < CITA_PRICE) return null;
  return {
    ...state,
    coins: state.coins - CITA_PRICE,
    claimedPlaces: [...state.claimedPlaces, placeId],
  };
}

export function availableGifts(state: MicaState) {
  return SHOP_ITEMS.filter((i) => i.oneTime && !state.purchased.includes(i.id));
}

export function availableTreats() {
  return SHOP_ITEMS.filter((i) => !i.oneTime);
}

export function availableCitas(state: MicaState): Place[] {
  return PLACES.filter(
    (p) => state.unlockedPlaces.includes(p.id) && !state.claimedPlaces.includes(p.id)
  );
}
