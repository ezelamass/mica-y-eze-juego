// Banco de preguntas: trivia de Friends (contenido público, ya cargado y
// verificado) y trivia personal (PLACEHOLDER — reemplazar por preguntas
// reales sobre Eze, ver sección 9 "Pendientes de Eze" del spec).

export interface TriviaQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

// Se necesitan 4 de 5 correctas para ganar "friends". Cada pregunta es una
// unidad de contenido propia en usedContent, así el banco entero rota antes
// de repetirse.
export const FRIENDS_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿En qué cafetería se reúne el grupo?",
    options: ["Central Perk", "Coffee Bean", "The Grind", "Java House"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "¿Cuál es el trabajo de Chandler?",
    options: [
      "Chef",
      "Algo con números y estadísticas de transacciones",
      "Abogado",
      "Publicista",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "¿Cómo se llama el mono de Ross?",
    options: ["Marcel", "Coco", "Chichi", "Bongo"],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "¿Qué palabra grita Joey en la sala de parto de Rachel?",
    options: ["¡Pivot!", "¡Push!", "¡Wow!", "¡How you doin'!"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "¿Cuál es el apellido de Monica y Ross?",
    options: ["Green", "Bing", "Geller", "Tribbiani"],
    correctIndex: 2,
  },
  {
    id: 6,
    question: "¿Qué instrumento toca Phoebe en Central Perk?",
    options: ["Piano", "Guitarra", "Violín", "Pandereta"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: '¿Cómo se llama la canción más famosa de Phoebe sobre un gato?',
    options: ["Cat Song", "Smelly Cat", "Kitty Blues", "Meow Meow"],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "¿Con qué famosa frase suele saludar Joey a las chicas?",
    options: ["¿Cómo estás?", "How you doin'?", "¡Qué tal!", "Hey, ¿todo bien?"],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "¿Cuál es la profesión de Ross?",
    options: ["Chef", "Paleontólogo", "Fotógrafo", "Contador"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "¿En qué ciudad transcurre la serie?",
    options: ["Boston", "Chicago", "Nueva York", "Los Ángeles"],
    correctIndex: 2,
  },
  {
    id: 11,
    question: "¿Quién se casa con Ross en Las Vegas por error de nombre?",
    options: ["Rachel", "Emily", "Bonnie", "Elizabeth"],
    correctIndex: 0,
  },
  {
    id: 12,
    question: "¿Cómo se llaman los mellizos de Phoebe que gesta para su hermano?",
    options: ["Frank Jr., Leslie y Chandler", "Emma, Ben y Jack", "Mike y Ursula", "Joey Jr. y Ross Jr."],
    correctIndex: 0,
  },
  {
    id: 13,
    question: "¿Qué mueble compran Ross y Rachel que no entra por las escaleras?",
    options: ["Un ropero", "Un sillón", "Una mesa", "Una biblioteca"],
    correctIndex: 1,
  },
  {
    id: 14,
    question: "¿Cuál es el nombre completo de la hija de Ross y Rachel?",
    options: ["Emma Geller-Green", "Chloe Bing", "Grace Tribbiani", "Alice Buffay"],
    correctIndex: 0,
  },
  {
    id: 15,
    question: "¿Qué actor interpreta a Chandler Bing?",
    options: ["David Schwimmer", "Matthew Perry", "Matt LeBlanc", "James Michael Tyler"],
    correctIndex: 1,
  },
  {
    id: 16,
    question: '¿Qué frase repiten todos al unísono al final de cada episodio, según el opening?',
    options: ["I'll be there for you", "So no one told you life was gonna be this way", "We were on a break", "Could I BE any more..."],
    correctIndex: 1,
  },
  {
    id: 17,
    question: "¿Quién es el vecino mayor con el que Joey y Chandler compiten?",
    options: ["Mr. Heckles", "Gunther", "Mr. Treeger", "Dr. Green"],
    correctIndex: 0,
  },
  {
    id: 18,
    question: "¿Quién trabaja como mesero en Central Perk enamorado de Rachel?",
    options: ["Gunther", "Joey", "Paul", "Tag"],
    correctIndex: 0,
  },
  {
    id: 19,
    question: "¿Con qué frase se defiende Ross cuando engaña a Rachel?",
    options: ["Fue un accidente", "¡Estábamos en un descanso!", "No fue mi culpa", "No cuenta"],
    correctIndex: 1,
  },
  {
    id: 20,
    question: "¿Cómo se llama el bebé que Joey casi adopta como propio en la serie de comedia?",
    options: ["No existe, es un chiste trampa", "Ben", "Jack", "Frankie"],
    correctIndex: 0,
  },
];

// PLACEHOLDER — reemplazar por preguntas reales sobre Eze (arrancar con 20
// según el spec). Las opciones y la respuesta marcada acá son de ejemplo,
// no reflejan datos reales.
export const PERSONAL_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es la comida favorita de Eze? (placeholder, editar)",
    options: ["Milanesa", "Sushi", "Asado", "Pizza"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "¿Qué serie puede volver a ver mil veces? (placeholder, editar)",
    options: ["Friends", "The Office", "Breaking Bad", "Los Simpson"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "¿Qué le da más fiaca hacer? (placeholder, editar)",
    options: ["Lavar los platos", "Hacer trámites", "Ir al gimnasio", "Cocinar"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "¿Cuál es su equipo de fútbol? (placeholder, editar)",
    options: ["Boca", "River", "Racing", "Independiente"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "¿Qué pide siempre para tomar? (placeholder, editar)",
    options: ["Fernet", "Cerveza", "Vino", "Café"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "¿Cuál es su color favorito? (placeholder, editar)",
    options: ["Negro", "Azul", "Verde", "Rojo"],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "¿Qué app tiene siempre abierta en la compu? (placeholder, editar)",
    options: ["El código", "Spotify", "Twitter", "Mail"],
    correctIndex: 0,
  },
  {
    id: 8,
    question: "¿Qué prefiere para desayunar? (placeholder, editar)",
    options: ["Mate", "Café con leche", "Té", "Jugo"],
    correctIndex: 0,
  },
  {
    id: 9,
    question: "¿Dónde le gustaría vivir algún día? (placeholder, editar)",
    options: ["Cerca del mar", "En la montaña", "En el campo", "En otra ciudad grande"],
    correctIndex: 0,
  },
  {
    id: 10,
    question: "¿Qué lo saca de las casillas más rápido? (placeholder, editar)",
    options: ["Que le cancelen planes último momento", "El tránsito", "La gente lenta", "Quedarse sin batería"],
    correctIndex: 0,
  },
];
