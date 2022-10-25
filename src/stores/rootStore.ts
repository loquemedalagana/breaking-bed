import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import characterListSaga from 'src/actions/characterListSaga';
import { characterListSlice } from 'src/stores/characterListStore';

const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
  characterList: characterListSlice.reducer,
});

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(sagaMiddleWare),
});

export type RootState = ReturnType<typeof rootStore.getState>;

sagaMiddleWare.run(characterListSaga);

export default rootStore;
