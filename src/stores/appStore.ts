import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import sagas from 'src/actions/sagas';
import characterListReducer from 'src/stores/characterListStore';
import characterDetailReducer from 'src/stores/characterDetailStore';

const appReducer = combineReducers({
  characterList: characterListReducer,
  characterDetail: characterDetailReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const appStore = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(sagaMiddleWare),
});

sagaMiddleWare.run(sagas);

export default appStore;

export type AppState = ReturnType<typeof appStore.getState>;
