// Contrato de cada minijuego (spec 6): recibe su contenido ya resuelto y
// devuelve si ganó o perdió. No toca el estado global ni la economía.
export type GameProps = {
  content: unknown;
  onFinish: (won: boolean) => void;
};
