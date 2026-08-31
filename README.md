# El juego de Micaela

App web local, sin servidor, para jugar de a dos una vez por día. Ella gana
monedas y XP: las monedas compran regalos y caprichos, la XP avanza en un
mapa que desbloquea lugares reales de Buenos Aires a los que todavía no
fueron.

Ver `SPEC.pdf` para el spec completo de implementación.

## Stack

Vite + React + TypeScript. Una sola página, sin router, sin librería de UI,
sin state manager. CSS plano con variables. Todo el contenido va
hardcodeado en `/src/data/`. Persistencia en `localStorage["mica.v1"]`.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # typecheck + build de producción
npm run lint      # solo typecheck
```

## Deploy

Vercel detecta Vite automáticamente (`npm run build`, carpeta `dist`). Repo
privado, sin contraseña ni gate de acceso: la URL es la única barrera.

## Estado del contenido (Fase 2)

Los archivos de `/src/data/` están sembrados con contenido de **placeholder**
para que el juego sea jugable de punta a punta ya mismo. Todo lo marcado
como `PLACEHOLDER` en los comentarios está pendiente de reemplazo por
contenido real:

- `memories.ts` — emojis, fotos, historias, mapa a ciegas, impostor, mímica.
- `questions.ts` — trivia personal (la trivia de Friends ya está cargada y
  verificada, no hace falta tocarla).
- `prendas.ts` — el mazo de prendas.
- `places.ts` — los 6 destinos del mapa.
- `/public/fotos/` — está vacía; los campos `photoSrc` / `imageSrc` de los
  archivos de datos son opcionales, así que el juego funciona igual sin
  fotos reales cargadas todavía.

Ver la sección 9 ("Pendientes de Eze") del spec para el detalle completo.
