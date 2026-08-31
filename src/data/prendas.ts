// El mazo de prendas: se sortea una al perder, sin repetir hasta agotar el
// mazo completo (ver engine.ts).
//
// PLACEHOLDER — reemplazar por el mazo real de Eze (sección 9 del spec).

export interface Prenda {
  id: number;
  text: string;
}

export const PRENDAS: Prenda[] = [
  { id: 1, text: "Cantale un tema entero al azar" },
  { id: 2, text: "Bailá 30 segundos sin música" },
  { id: 3, text: "Contale un secreto tonto" },
  { id: 4, text: "Hacele un masaje de 2 minutos sin quejarte" },
  { id: 5, text: "Hablá con acento por los próximos 10 minutos" },
  { id: 6, text: "Sacate una foto graciosa ahora mismo" },
  { id: 7, text: "Decile 3 cosas que te gustan de ella" },
  { id: 8, text: "Imitá a un personaje de Friends" },
  { id: 9, text: "Preparale algo rico para tomar" },
  { id: 10, text: "Contale el recuerdo más vergonzoso que tengas" },
  { id: 11, text: "Hacé de mesero el resto de la noche" },
  { id: 12, text: "Elegí vos la próxima peli sin quejarte" },
  { id: 13, text: "Escribile una mini poesía improvisada" },
  { id: 14, text: "Dejala elegir tu outfit de mañana" },
  { id: 15, text: "Contale un chiste malo, en vivo" },
  { id: 16, text: "Hacele de peluquero 5 minutos" },
  { id: 17, text: "Cantá el cumpleaños feliz como si fuera ópera" },
  { id: 18, text: "Regalale un abrazo de 1 minuto entero" },
  { id: 19, text: "Contale algo que nunca le dijiste" },
  { id: 20, text: "Hacé 10 sentadillas antes de seguir jugando" },
];
