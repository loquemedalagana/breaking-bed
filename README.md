# Breaking Bed

This repository is for the application where the details of the characters of the Breaking Bed.

- the server is based on [Breaking Bed open API](https://github.com/timbiles/Breaking-Bad--API)

## Basic Commands

```bash
# how to start
yarn start

# how to test
yarn test

# how to build
yarn build
```

## Routes

`/`

- to show character list

### state management - redux

`/:characterId`

- to show character detail and a famous phrase

### state management - context API

## Used Libraries

1. [immer](https://immerjs.github.io/immer/)
2. [axios](https://axios-http.com/es/docs/intro)
3. [dayjs](https://day.js.org/docs/en/display/calendar-time)
4. [i18n](https://react.i18next.com/guides/quick-start)
5. [material UI](https://mui.com/material-ui/getting-started/overview/)
6. [redux toolkit](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)

- As `createStore` was deprecated in the latest version, I've no choice but to use toolkit. Nevertheless, I know that `createStore` is used when converting combined reducers into a single store.
