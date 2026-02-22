## Gifs App

Aplicacion en React para buscar y explorar gifs usando la API de Giphy. Incluye busquedas previas, cache en memoria, y envio opcional de eventos a GA4.

### Caracteristicas

- Busqueda de gifs con debounce
- Historial de busquedas recientes
- Cache en memoria por termino
- Consumo de API con Axios
- Tests con Vitest y Testing Library

### Stack

- React 19 + TypeScript
- Vite
- Vitest + Testing Library
- Axios

### Requisitos

- Node.js 18+ (recomendado)
- Una API key de Giphy

### Configuracion

1) Instalar dependencias

```bash
npm install
```

2) Crear archivo .env con tu API key

```bash
VITE_GIPHY_API_KEY=tu_api_key
```

### Uso

```bash
npm run dev
```

Abre la URL que muestra Vite en consola.

### Scripts utiles

- `npm run dev` Inicia el servidor de desarrollo
- `npm run build` Ejecuta tests y genera build de produccion
- `npm run preview` Previsualiza el build
- `npm run test` Corre tests en modo watch
- `npm run test:only` Corre tests una sola vez
- `npm run test:ui` Abre la UI de Vitest
- `npm run coverage` Genera reporte de cobertura
- `npm run lint` Lint del proyecto

### Arbol de archivos

```text
.
|-- .env.template
|-- .gitignore
|-- README.md
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- public
|   |-- _redirects
|   |-- sitemap.xml
|   |-- vite.svg
|-- src
|   |-- GifsApp.test.tsx
|   |-- GifsApp.tsx
|   |-- index.css
|   |-- main.tsx
|   |-- __snapshots__
|   |   |-- GifsApp.test.tsx.snap
|   |-- counter
|   |   |-- components
|   |   |   |-- MyCounterApp.test.tsx
|   |   |   |-- MyCounterApp.tsx
|   |   |   |-- MyCounterApp2.test.tsx
|   |   |-- hooks
|   |   |   |-- useCounter.test.ts
|   |   |   |-- useCounter.tsx
|   |-- gifs
|   |   |-- actions
|   |   |   |-- get-gifs-by-query.actions.test.ts
|   |   |   |-- get-gifs-by-query.actions.ts
|   |   |-- api
|   |   |   |-- giphy.api.ts
|   |   |   |-- giphy.apy.test.ts
|   |   |-- components
|   |   |   |-- GifList.tsx
|   |   |   |-- PreviousSearches.tsx
|   |   |-- hooks
|   |   |   |-- useGifs.test.tsx
|   |   |   |-- useGifs.tsx
|   |   |-- interfaces
|   |   |   |-- gif.interface.ts
|   |   |   |-- giphy.response.ts
|   |-- mock-data
|   |   |-- gifs.mock.ts
|   |-- shared
|   |   |-- components
|   |   |   |-- __snapshots__
|   |   |   |   |-- SearchBar.test.tsx.snap
|   |   |   |-- CustomHeader.test.tsx
|   |   |   |-- CustomHeader.tsx
|   |   |   |-- SearchBar.test.tsx
|   |   |   |-- SearchBar.tsx
|-- test
|   |-- mocks
|   |   |-- gifs.data.ts
|   |   |-- giphy.response.data.ts
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- coverage
|   |-- base.css
|   |-- block-navigation.js
|   |-- clover.xml
|   |-- coverage-final.json
|   |-- favicon.png
|   |-- index.html
|   |-- prettify.css
|   |-- prettify.js
|   |-- sort-arrow-sprite.png
|   |-- sorter.js
|   |-- src
|   |   |-- GifsApp.tsx.html
|   |   |-- index.html
|   |   |-- counter
|   |   |   |-- components
|   |   |   |   |-- MyCounterApp.tsx.html
|   |   |   |   |-- index.html
|   |   |   |-- hooks
|   |   |   |   |-- index.html
|   |   |   |   |-- useCounter.tsx.html
|   |   |-- gifs
|   |   |   |-- actions
|   |   |   |   |-- get-gifs-by-query.actions.ts.html
|   |   |   |   |-- index.html
|   |   |   |-- api
|   |   |   |   |-- giphy.api.ts.html
|   |   |   |   |-- index.html
|   |   |   |-- components
|   |   |   |   |-- GifList.tsx.html
|   |   |   |   |-- PreviousSearches.tsx.html
|   |   |   |   |-- index.html
|   |   |   |-- hooks
|   |   |   |   |-- index.html
|   |   |   |   |-- useGifs.tsx.html
|   |   |-- shared
|   |   |   |-- components
|   |   |   |   |-- CustomHeader.tsx.html
|   |   |   |   |-- SearchBar.tsx.html
|   |   |   |   |-- index.html
|   |-- test
|   |   |-- mocks
|   |   |   |-- giphy.response.data.ts.html
|   |   |   |-- index.html
```

### Notas

- El historial de busquedas se limita a 8 terminos.
- Si existe `gtag` o `dataLayer`, se emite el evento `search` para GA4.

