// Los 13 juegos del bombo: 10 minijuegos digitales + 3 juegos de mesa.
// Para agregar un juego de mesa nuevo, alcanza con sumar una línea al array BOARD_GAMES.

export type GameId =
  | "emoji"
  | "timeline"
  | "memoria"
  | "historia"
  | "mapaciego"
  | "impostor"
  | "personal"
  | "friends"
  | "mimica"
  | "ppt"
  | "bibliotecarios"
  | "chinchon"
  | "chin";

export type GameKind = "digital" | "board";

export interface GameDef {
  id: GameId;
  name: string;
  kind: GameKind;
  coins: number;
  xp: number;
  /** true si el juego necesita elegir contenido sin usar de un banco de datos. */
  hasContent: boolean;
}

export const DIGITAL_GAMES: GameDef[] = [
  { id: "emoji", name: "Recuerdo en emojis", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "timeline", name: "Línea temporal", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "memoria", name: "Memoria compartida", kind: "digital", coins: 2, xp: 15, hasContent: true },
  { id: "historia", name: "Seguí la historia", kind: "digital", coins: 2, xp: 15, hasContent: true },
  { id: "mapaciego", name: "Mapa a ciegas", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "impostor", name: "Impostor", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "personal", name: "Trivia personal", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "friends", name: "Trivia de Friends", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "mimica", name: "Mímica", kind: "digital", coins: 1, xp: 10, hasContent: true },
  { id: "ppt", name: "Piedra, papel o tijera", kind: "digital", coins: 1, xp: 5, hasContent: false },
];

export const BOARD_GAMES: GameDef[] = [
  { id: "bibliotecarios", name: "Bibliotecarios Gritones", kind: "board", coins: 3, xp: 30, hasContent: false },
  { id: "chinchon", name: "Chinchón", kind: "board", coins: 3, xp: 30, hasContent: false },
  { id: "chin", name: "Chin", kind: "board", coins: 3, xp: 30, hasContent: false },
];

export const ALL_GAMES: GameDef[] = [...DIGITAL_GAMES, ...BOARD_GAMES];

export function getGame(id: GameId): GameDef {
  const game = ALL_GAMES.find((g) => g.id === id);
  if (!game) throw new Error(`Juego desconocido: ${id}`);
  return game;
}
