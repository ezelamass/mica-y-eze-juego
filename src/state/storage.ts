// Toda lectura y escritura de localStorage pasa por acá. Nunca leer
// localStorage desde un componente.

import type { GameId } from "../data/games";

export const STORAGE_KEY = "mica.v1";
export const CURRENT_VERSION = 1;

export interface TodaysGame {
  date: string;
  gameId: GameId;
  /** ids del contenido usado hoy para ese juego (vacío si no usa contenido) */
  contentIds: number[];
}

export interface LogEntry {
  date: string;
  game: GameId;
  won: boolean;
  coins: number;
  xp: number;
}

export interface MicaState {
  version: number;
  coins: number;
  xp: number;
  streak: number;
  /** bloquea el segundo juego del día */
  lastPlayedDate: string | null;
  /** tope de un juego de mesa cada 7 días */
  lastBoardGameDate: string | null;
  todaysGame: TodaysGame | null;
  /** últimos 3 juegos jugados, no se repiten en el sorteo */
  recentGames: GameId[];
  /** días jugados desde la última tirada bonus (0, 1, 2 y en 3 se habilita) */
  diceCounter: number;
  /** hay una tirada bonus lista para usar */
  diceAvailable: boolean;
  /** mazo de prendas sin reposición */
  usedPrendas: number[];
  usedContent: Partial<Record<GameId, number[]>>;
  unlockedPlaces: string[];
  claimedPlaces: string[];
  purchased: string[];
  mapNode: number;
  log: LogEntry[];
}

export function defaultState(): MicaState {
  return {
    version: CURRENT_VERSION,
    coins: 0,
    xp: 0,
    streak: 0,
    lastPlayedDate: null,
    lastBoardGameDate: null,
    todaysGame: null,
    recentGames: [],
    diceCounter: 0,
    diceAvailable: false,
    usedPrendas: [],
    usedContent: {},
    unlockedPlaces: [],
    claimedPlaces: [],
    purchased: [],
    mapNode: 0,
    log: [],
  };
}

/**
 * Migra un JSON viejo (o parcial) al shape actual, campo por campo, sin
 * descartar nada en silencio. Hoy solo existe version 1; cuando exista una
 * version 2 acá es donde se traducen los campos que cambiaron de forma.
 */
function migrate(raw: unknown): MicaState {
  const base = defaultState();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<MicaState>;
  return {
    ...base,
    ...r,
    version: CURRENT_VERSION,
    usedContent: { ...base.usedContent, ...(r.usedContent ?? {}) },
  };
}

export function load(): MicaState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const state = migrate(parsed);
    if (parsed?.version !== CURRENT_VERSION) save(state);
    return state;
  } catch {
    return defaultState();
  }
}

export function save(state: MicaState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportProgress(state: MicaState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `mica-progreso-${today}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Reusa la misma migración que la carga normal: así un export viejo de una
 * versión anterior se puede volver a importar sin rechazarlo. Devuelve null
 * solo si el archivo ni siquiera es un JSON de objeto válido.
 */
export function parseImport(json: string): MicaState | null {
  try {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    return migrate(parsed);
  } catch {
    return null;
  }
}
