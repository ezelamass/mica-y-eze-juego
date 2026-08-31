// Contenido de memoria compartida: emojis, fotos con fecha, historias,
// mapa a ciegas, impostor y mímica.
//
// PLACEHOLDER: todo lo de acá es contenido de ejemplo para que el juego sea
// jugable de punta a punta. Eze tiene que reemplazarlo por recuerdos reales
// (ver "Pendientes de Eze" en el spec): fotos en /public/fotos/, emojis
// (arrancar con 15), historias, etc. Las fotos son opcionales (photoSrc):
// si el archivo no existe o no se carga, el juego muestra la pista de texto
// igual.

export interface EmojiMemory {
  id: number;
  emojis: string;
  answer: string;
  /** palabras clave alternativas que también cuentan como acierto */
  keywords: string[];
}

export const EMOJI_MEMORIES: EmojiMemory[] = [
  { id: 1, emojis: "🚌 🌧️ 🍕 😂", answer: "el dia que perdimos el bondi bajo la lluvia", keywords: ["bondi", "lluvia", "colectivo"] },
  { id: 2, emojis: "🎬 🍿 😱 🛋️", answer: "la noche de peliculas de terror", keywords: ["terror", "pelicula", "sofa"] },
  { id: 3, emojis: "✈️ 🧳 🌅 😍", answer: "el primer viaje juntos", keywords: ["viaje", "avion", "aeropuerto"] },
  { id: 4, emojis: "🍳 🔥 😅 🍽️", answer: "cuando se quemo la comida", keywords: ["quemamos", "comida", "cocina"] },
  { id: 5, emojis: "🎂 🕯️ 🎉 📸", answer: "el cumpleanos sorpresa", keywords: ["cumple", "sorpresa", "torta"] },
  { id: 6, emojis: "🌧️ ☂️ 🚶 💕", answer: "la caminata bajo la lluvia", keywords: ["caminata", "paraguas", "lluvia"] },
  { id: 7, emojis: "🐶 🏞️ ☀️ 😄", answer: "el dia de picnic en el parque", keywords: ["picnic", "parque", "perro"] },
  { id: 8, emojis: "🚗 🎵 🌙 😌", answer: "el viaje en auto de noche escuchando musica", keywords: ["auto", "musica", "noche"] },
  { id: 9, emojis: "🏖️ 🌊 🍹 😎", answer: "las vacaciones en la playa", keywords: ["playa", "mar", "vacaciones"] },
  { id: 10, emojis: "❄️ 🧣 ☕ 🥰", answer: "el dia mas frio que tomamos algo caliente", keywords: ["frio", "cafe", "invierno"] },
  { id: 11, emojis: "🎡 🎪 🍭 😆", answer: "la vuelta al parque de diversiones", keywords: ["parque", "diversiones", "feria"] },
  { id: 12, emojis: "📦 🏠 🔑 🥳", answer: "el dia que nos mudamos", keywords: ["mudanza", "casa", "llaves"] },
  { id: 13, emojis: "🍝 🕯️ 🍷 💑", answer: "la primera cena romantica que cocinamos", keywords: ["cena", "romantica", "casa"] },
  { id: 14, emojis: "⚽ 🏟️ 📣 😁", answer: "el dia que fuimos a la cancha", keywords: ["cancha", "futbol", "partido"] },
  { id: 15, emojis: "🌌 🔭 🏕️ 🤗", answer: "la noche que acampamos mirando estrellas", keywords: ["acampar", "estrellas", "campamento"] },
];

export interface TimelineItem {
  caption: string;
  photoSrc?: string;
}

export interface TimelineSet {
  id: number;
  /** en orden cronológico correcto; la UI los mezcla para jugar */
  items: [TimelineItem, TimelineItem, TimelineItem, TimelineItem, TimelineItem];
}

export const TIMELINE_SETS: TimelineSet[] = [
  {
    id: 1,
    items: [
      { caption: "El primer mensaje" },
      { caption: "La primera cita" },
      { caption: "El primer viaje" },
      { caption: "La primera pelea tonta" },
      { caption: "La primera vez que dijimos te amo" },
    ],
  },
  {
    id: 2,
    items: [
      { caption: "Nos conocimos" },
      { caption: "El primer verano juntos" },
      { caption: "Conocer a la familia" },
      { caption: "La primera Navidad juntos" },
      { caption: "El primer aniversario" },
    ],
  },
];

export interface MemoriaContent {
  id: number;
  photoSrc?: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

export const MEMORIA_CONTENT: MemoriaContent[] = [
  {
    id: 1,
    question: "¿Qué día fue esta foto?",
    options: ["Un cumpleaños", "Un domingo cualquiera", "Año nuevo", "Nuestro aniversario"],
    correctIndex: 3,
  },
  {
    id: 2,
    question: "¿Dónde fue esta foto?",
    options: ["En casa", "De viaje", "En lo de una amiga", "En el trabajo"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "¿Qué tenía puesto Eze ese día?",
    options: ["Remera negra", "Camisa", "Buzo", "Campera"],
    correctIndex: 0,
  },
];

export interface HistoriaStarter {
  id: number;
  text: string;
}

export const HISTORIA_STARTERS: HistoriaStarter[] = [
  { id: 1, text: "Ese sábado salimos sin plan, caminando, y de repente..." },
  { id: 2, text: "Llegamos tarde porque Eze no encontraba las llaves, y cuando por fin salimos..." },
  { id: 3, text: "Estábamos cenando cuando de la nada Eze dijo..." },
  { id: 4, text: "Fuimos a comprar algo rápido al kiosco y terminamos..." },
  { id: 5, text: "Era un día común hasta que sonó el teléfono y..." },
];

export interface MapaCiegoContent {
  id: number;
  imageSrc?: string;
  clue: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

export const MAPACIEGO_CONTENT: MapaCiegoContent[] = [
  {
    id: 1,
    clue: "Un recorte del mapa de un lugar donde ya estuvimos.",
    options: ["Puerto Madero", "San Telmo", "Palermo", "La Boca"],
    correctIndex: 0,
  },
  {
    id: 2,
    clue: "El lugar donde fuimos a caminar un domingo de sol.",
    options: ["Bosques de Palermo", "Costanera Sur", "Plaza de Mayo", "Recoleta"],
    correctIndex: 0,
  },
];

export interface ImpostorContent {
  id: number;
  statements: [string, string, string, string];
  falseIndex: 0 | 1 | 2 | 3;
}

export const IMPOSTOR_CONTENT: ImpostorContent[] = [
  {
    id: 1,
    statements: [
      "La primera vez que salimos llovía.",
      "Eze llegó tarde a la primera cita.",
      "Nos conocimos por amigos en común.",
      "La primera vez que salimos fuimos al cine.",
    ],
    falseIndex: 3,
  },
  {
    id: 2,
    statements: [
      "A Eze le encanta el fernet.",
      "A Eze le encanta el sushi.",
      "Eze odia el picante.",
      "Eze es hincha de Boca.",
    ],
    falseIndex: 2,
  },
  {
    id: 3,
    statements: [
      "Nuestro primer viaje juntos fue a la costa.",
      "Nuestro primer viaje juntos fue al exterior.",
      "En ese viaje llovió un día entero.",
      "Volvimos un día antes de lo planeado.",
    ],
    falseIndex: 1,
  },
];

export interface MimicaPrompt {
  id: number;
  category: "Películas" | "Trabajos" | "Canciones" | "Momentos nuestros";
  prompt: string;
}

export const MIMICA_PROMPTS: MimicaPrompt[] = [
  { id: 1, category: "Películas", prompt: "Titanic" },
  { id: 2, category: "Películas", prompt: "Jurassic Park" },
  { id: 3, category: "Trabajos", prompt: "Programador escribiendo código" },
  { id: 4, category: "Trabajos", prompt: "Chef cocinando apurado" },
  { id: 5, category: "Canciones", prompt: "Bohemian Rhapsody" },
  { id: 6, category: "Canciones", prompt: "Despacito" },
  { id: 7, category: "Momentos nuestros", prompt: "El día que se quemó la comida" },
  { id: 8, category: "Momentos nuestros", prompt: "La vez que nos perdimos volviendo a casa" },
  { id: 9, category: "Películas", prompt: "Toy Story" },
  { id: 10, category: "Trabajos", prompt: "Peluquera cortando el pelo" },
];
