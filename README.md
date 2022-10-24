# Breaking Bed

This repository is for the application where the details of the characters of the Breaking Bed.

- the server is based on [Breaking Bed open API](https://github.com/timbiles/Breaking-Bad--API)

## Basic Commands

```bash
# to start the app
yarn start

# to run e2e test based on UI
## before the app should be started
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

### git branches

- release: `master`
- develop: `dev`
- features: `feature/*`
- All the `feature branches` should be merged into `dev` before release.

<hr/>

## Project Structure

```
.
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

- All UI components are in `src/components` directory
- For responsive UI, the devices' sizes are defined in `src/device/devices.js`

### Business logics

- All component files in `src/pages` directory are for connecting business logics to UI components.
- All files to request data to server are in `/http` directory
- The business logic of `Character List` is treated by `src/actions/characterListSaga.ts`
- The business logics of `Character Detail` and `Quote` are handled by `custom hooks(use...Store.ts)` in `src/store/...Store.ts`

### Test

- All the tests will be conducted automatically through `github-action`
- `saga`, `contexts`, `reducers` are tested via `Jest`
- `UI` and `e2e` tests are conducted by `cypress`. [Test screenshots](https://github.com/loquemedalagana/breaking-bed/pull/35)
- [All the automated test logs are available in this link](https://github.com/loquemedalagana/breaking-bed/actions)

### internationalization by i18n

- All translations are saved in `src/locales` in `Spanish` as well as `English`

<hr/>

## State Management

### Character List - `Redux Saga`

#### action

- Types are defined in `characterListActions.ts`
- Fetching the list is handled by `fetchCharacterList Saga` checking the current state of character list.
- When an user reaches the bottom, `characterListRequest action` will be triggered through `intersection observer` after calling `watchFetchedCharacterList` saga.
- If all information has been loaded, `getReachedEnd` action will be triggered.
- If an error is detected, the app will be redirected to `error page` through `error action`.

#### Reducer

- The reducer is defined in `characterListStore.ts` as `characterListSlice`.

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
