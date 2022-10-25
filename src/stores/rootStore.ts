import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { appSlice } from 'src/stores/appStore';
import { characterListSlice } from 'src/stores/characterListStore';
import rootSaga from 'src/actions/rootSaga';

const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
  characterList: characterListSlice.reducer,
  app: appSlice.reducer,
});

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(sagaMiddleWare),
});

export type RootState = ReturnType<typeof rootStore.getState>;

sagaMiddleWare.run(rootSaga);

export default rootStore;
