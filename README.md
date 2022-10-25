# Breaking Bed

This repository is for the application where the details of the characters of the Breaking Bed.

- the server is based on [Breaking Bed open API](https://github.com/timbiles/Breaking-Bad--API).

## Basic Commands

```bash
# to start the app
yarn start

# to run e2e test based on UI
## before the app should be started
yarn start
yarn cypress

# to run functional test
yarn test

# to build
yarn build

# to generate translation texts automatically
yarn i18n

```

<hr />

## Routes

`/`

- to show character list

`/:characterId`

- to show character detail and famous quote

<hr/>

## Deployment

- This app is deployed automatically in `netlify` when `master` branch is updated.
- [current version is here](https://lovely-gumption-8674d2.netlify.app/)

### release history

- [Finished character detail page](https://github.com/loquemedalagana/breaking-bed/pull/3)

  - The character list page was not available.

- [Add internationalization and add the character list](https://github.com/loquemedalagana/breaking-bed/pull/10)

  - There was some side effects when loading the character list.

- [Fix the bugs of previous releases](https://github.com/loquemedalagana/breaking-bed/pull/17)
- [Add unit tests and fixed some bugs](https://github.com/loquemedalagana/breaking-bed/pull/21)
- [Fix minor bugs of character list page](https://github.com/loquemedalagana/breaking-bed/pull/24)
- [Fix serious UI error](https://github.com/loquemedalagana/breaking-bed/pull/29)
- [Fix date error on Safari](https://github.com/loquemedalagana/breaking-bed/pull/31)
- [Add test automation scripts and 404 page texts](https://github.com/loquemedalagana/breaking-bed/pull/38)

<hr />

### git branches

- release: `master`
- develop: `dev`
- features: `feature/*`
- All the `feature branches` should be merged into `dev` before release.

<hr/>

## Project Structure

```
.
├── .github/workflows # CI test scripts
├── cypress/
│   └── e2e/
├── public/
│   └── index.html
├── src/
│   ├── actions/
│   │   └── # action types, definitions and saga
│   ├── components/
│   │   └── # all ui components
│   ├── device/
│   │   └── devices.js # to define the width of mobile, tablet and desktop
│   ├── http/
│   │   └── # files related with restAPI
│   ├── locales/
│   │   └── # files related with i18n
│   ├── models/
│   │   ├── # model classes
│   │   ├── Quote.ts
│   │   └── Character.ts
│   ├── pages/
│   │   ├── # page components which connect business logics to UI
│   │   ├── CharacterDetailPage.tsx
│   │   ├── CharacterList.tsx
│   │   └── ErrorPage.tsx
│   ├── routes/
│   │   ├── # all files related with routing
│   │   ├── RootLayout.tsx
│   │   ├── routes.ts
│   │   └── routeURL.ts
│   ├── stores/
│   │   ├── appStore.tsx
│   │   ├── BreakingBadProvider.tsx
│   │   ├── contexts.ts // context api files
│   │   ├── characterDetailStore.ts
│   │   ├── characterListStore.ts
│   │   ├── randomQuoteStore.ts
│   │   └── rootStore.ts
│   ├── styles/
│   │   └── theme.js # this file is for MUI
│   ├── tests/
│   │   ├── contexts/
│   │   ├── mocks/
│   │   ├── reducers/
│   │   ├── saga/
│   │   └── util/
│   ├── i18n.js
│   ├── App.tsx
│   └── index.tsx
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── i18next-scanner.config.js
├── jest.config.js
├── package.json
└── tsconfig.json
```

### UI

- All UI components are in `src/components` directory.
- For responsive UI, the devices' sizes are defined in `src/device/devices.js`.

#### Atomic Components

- `Image` component shows `error message` when the image cannot be loaded.
- `Table` component is easier to use, only receiving necessary props: `row, col, data to be shown`.
- `Select Language` to select language.
- `Loading`to show changeable loading spinner depending on its parent element's size.

#### Molecule Components

- `Quote`component is composed of `one quote` and `button to load another quote`. In the loading state, it shows loading spinner, and if the character doesn't have any quote, it shows message in Spanish as well as English depending on the language state of the app.

#### Organism Components

- `Header` marked up with `<header/>` tag.
- `Footer` marked up with `<footer/>` tag.
- `Character List` to show character list
- `Character Detail` to show character detail and his or her quote.
- `Error` to show error. It receives a prop to render error message differently: in page, in quote.

#### Template Component

- `RootLayout` in the `src/routes` directory.

#### Page Components

- All components in the `src/pages` directory, which connect business logic to UI components.

<hr />

### Business logics

- All component files in `src/pages` directory are for connecting business logics to UI components.
- All files to request data to server are in `/http` directory
- The business logics of `Character List` are treated by `src/actions/characterListSaga.ts`
- The business logics of `Character Detail` and `Quote` are handled by `custom hooks(use...Store.ts)` in `src/store/...Store.ts`

### Test

- All the tests will be conducted automatically through `github-action`.
- `saga`, `contexts`, `reducers` are tested via `Jest`.
- `UI` and `e2e` tests are conducted by `cypress`. [Test screenshots](https://github.com/loquemedalagana/breaking-bed/pull/35).
- [All the automated test logs are available in this link](https://github.com/loquemedalagana/breaking-bed/actions).

### internationalization by `i18n`

- All translations are saved in `src/locales` in `Spanish` as well as `English`.
- `Select Language` element is situated in the `header`.
- `dayjs` was used to show a character's birthday in the internationalized format, English and Spanish.

<hr/>

## State Management

### App - `Redux Saga`

- Currently `AppState`only saves `error` information, where it occurs, such as `/`, `/404`, `/:characterId`; therefore, only `take` effect was used.

### Character List - `Redux Saga`

#### action

- Types are defined in `characterListActions.ts`.
- Fetching the list is handled by `fetchCharacterList Saga` checking the current state of character list.
- When an user reaches the bottom, which is intersecting through the viewport, `characterListRequest action` will be triggered after calling `watchFetchedCharacterList` saga with `throttle`, which can prevent unnecessary calls for a period of the time.
- If all information has been loaded, `getReachedEnd` action will be triggered.
- If an error is detected, the app will be redirected to `error page` through `error action`.

#### Reducer

- The reducer is defined in `characterListStore.ts` as `characterListSlice`.
- So `appSagas` are relatively simple only calling `take` effect because these actions are not asynchronous.

#### How to be used in components?

- The character list is called in `CharacterListPage.tsx` when `the bottom element` is intersecting through `useEffect` function.

#### Why `Redux-Saga` was used?

- To optimize the data fetching when scrolling down using `throttle`, that can cause unexpected `side-effects`.
- Writing `testing codes` is more comfortable than `redux-thunk`.

<hr />

### Character Detail - `Context API`

#### Action

- Types are defined in `characterDetailActions.ts`.
- Fetching the data is conducted in a custom hook, `useCharacterDetailStore`.
- Initiate the state is defined also in the custom hook to `Clean Up` the `Page Component`.

#### Reducer

- The reducer is defined in `characterDetailStore.ts` as `characterDetailReducer`, a pure function.

#### How to be used in components?

- When `CharacterListPage.tsx` is rendered, `getCharacterDetailInfo` in the `custom hook` will be called.
- If the data already is loaded in the `Redux Store`, `the character's info` can be brought from `characterListStore` without any unnecessary request.
- If there is nothing in the `characterListState`, `fetchCharacterDetail` will be called.

#### Why `Context` was used?

- To control `side-effects` more comfortably, I used `Context` rather than `Redux Saga` using cleanup functions.
- With `Context`, the custom hook can be defined without restriction of the rule of `Redux`.

### Quote - `Context API`

#### Action

- Types are defined in `randomQuoteActions.ts`.
- Fetching the data is conducted in a custom hook, `useRandomQuoteStore`.

#### Reducer

- The reducer is defined in `randomQuoteStore.ts` as `randomQuoteReducer`, a pure function.

#### How to be used?

- When the ancestor component `CharacterDetailPage` is rendered, `fetchCharacterRandomQuote` in the `custom hook` will be called after `character detail data` is loaded.
- After the click of `load another quote` button in the `Quote Component`, `fetchCharacterRandomQuote` in the `custom hook` will be called again.
- When `CharacterDetailPage Component` is unmounted, `getInitQuoteState` in the `custom hook` will be called.

#### Why `Context` was used?

- I used `Context` to get its state directly in the `Quote` UI component, which has too many parent components.
- Like `CharacterDetail`, the custom hook can be defined without restriction of the rule of `Redux`.
- To initiate the `RandomQuoteState` directly in the `CharacterDetailPage` without `prop drilling`.

<hr />

## Error Management

- This api doesn't receive 404 status code when requesting with an invalid url.
- When an error is detected, the error state is saved in `appStore`.

### Expected Error

#### Character List

- When the offset number is grater than the greatest character's id, it returns `an empty array`.

#### Character Detail

- When requesting an invalid character id, it returns `500` status code.

#### Quote

- When requesting a quote of a character without quote, it returns `an empty array`.

#### 404 Not Found

- `Invalid Route` error is detected in `react-router-dom`.

<hr />

## Retrospection

Esta prueba fue una buena oportunidad de repasar todos mis conocimientos y de aprender lo que no conocía antes.

Aunque no pude añadir más funciones, di más importancia en `pruebas de cada función` y `manejo de estado` que `añadir más funciones`. Al hacer esta prueba, utilicé `github action` y `cypress` con las que usé en mi antigua empresa. Luego, usé `jest` por primera vez en frontend. Para mí, al probar `sagas y hooks`, es más útil que `cypress`, mientras que probar `UI` `cypress` es más cómodo. Gracias a pruebas automatizadas, encontré errores más fácilmente.

Al manejar el estado de esta app, utilicé `context API` así como `redux`. Dicen que a veces, se utilizan más de una librería cuyas funciones sean muy parecidas. `redux saga` ofrece muchos efectos, así que al controlar estado con más `Side Effects`, utilicé `redux saga` por primera vez.

En cambio, el estado de la pantalla de detalle y el de una frase, solo se necesita en un route específico. Además, cuando la página se desmonte, hay que hacer cleanup. Por eso, pensaba que meter esos estados en Redux podría confundirme. En mi empresa antigua, en este caso, utilicé `el estado locale` solo con `useState`, en esta vez, usé `Context API` para evitar `prop drillings` innecesarios.

Si me diera más tiempo para añadir más funciones, desarrollaría una función de búsqueda automática basada en texto, que se debería llamar justo después de que un usuario termine de escribir, con el efecto de `debounce`, que actualiza la nueva solicitud del usuario.
