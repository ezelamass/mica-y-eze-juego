import type { ComponentType } from "react";
import type { GameId } from "../data/games";
import type { GameProps } from "./GameProps";
import { Emoji } from "./Emoji";
import { Timeline } from "./Timeline";
import { Memoria } from "./Memoria";
import { Historia } from "./Historia";
import { MapaCiego } from "./MapaCiego";
import { Impostor } from "./Impostor";
import { Personal } from "./Personal";
import { Friends } from "./Friends";
import { Mimica } from "./Mimica";
import { Ppt } from "./Ppt";
import { BoardGame } from "./BoardGame";

export const GAME_COMPONENTS: Record<GameId, ComponentType<GameProps>> = {
  emoji: Emoji,
  timeline: Timeline,
  memoria: Memoria,
  historia: Historia,
  mapaciego: MapaCiego,
  impostor: Impostor,
  personal: Personal,
  friends: Friends,
  mimica: Mimica,
  ppt: Ppt,
  bibliotecarios: BoardGame,
  chinchon: BoardGame,
  chin: BoardGame,
};
