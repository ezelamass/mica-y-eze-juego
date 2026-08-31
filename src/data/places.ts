// Destinos del mapa: 6 lugares de Buenos Aires / alrededores donde todavía
// no fueron. Se revelan en orden en las casillas 5, 10, 15, 20, 25 y 30.
//
// PLACEHOLDER — Eze tiene que pasar la lista real (sección 9 del spec).
// El orden del array es el orden en que se van a revelar.

export interface Place {
  id: string;
  name: string;
  description: string;
  /** casilla del mapa (5, 10, 15, 20, 25 o 30) en la que se revela */
  unlockNode: 5 | 10 | 15 | 20 | 25 | 30;
}

export const PLACES: Place[] = [
  {
    id: "tigre-delta",
    name: "Tigre y el Delta",
    description: "Un día de lancha y aire de río, a una hora de casa.",
    unlockNode: 5,
  },
  {
    id: "jardin-japones",
    name: "Jardín Japonés",
    description: "Una tarde tranquila entre puentes y carpas koi.",
    unlockNode: 10,
  },
  {
    id: "san-antonio-de-areco",
    name: "San Antonio de Areco",
    description: "Pueblo de gauchos, asado y siesta de campo.",
    unlockNode: 15,
  },
  {
    id: "tandil",
    name: "Tandil",
    description: "Sierras, queso y un fin de semana largo.",
    unlockNode: 20,
  },
  {
    id: "colonia-del-sacramento",
    name: "Colonia del Sacramento",
    description: "Cruzar el río para caminar calles de piedra.",
    unlockNode: 25,
  },
  {
    id: "reserva-ecologica",
    name: "Reserva Ecológica Costanera Sur",
    description: "Atardecer caminando entre la ciudad y el río.",
    unlockNode: 30,
  },
];
