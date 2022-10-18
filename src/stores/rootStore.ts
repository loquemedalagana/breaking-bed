import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import sagas from 'src/actions/sagas';
import characterListReducer from 'src/stores/characterListStore';
import characterDetailReducer from 'src/stores/characterDetailStore';
import appReducer from 'src/stores/appStore';

const rootReducer = combineReducers({
  characterList: characterListReducer,
  characterDetail: characterDetailReducer,
  app: appReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(sagaMiddleWare),
});

sagaMiddleWare.run(sagas);

export default rootStore;

export type RootState = ReturnType<typeof rootStore.getState>;
