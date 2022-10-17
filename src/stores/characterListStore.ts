import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import characterListSaga from 'src/actions/characterListSaga';
import { CHARACTER_LIST_ERROR, CHARACTER_LIST_LOADING, CHARACTER_LIST_SUCCESS } from 'src/actions/types';
import Character from 'src/models/Character';

export interface CharacterListState {
  page: number;
  data: Character[];
  loading: boolean;
  error: Error | null | unknown;
  isReachedEnd: boolean;
}
export const initialState: CharacterListState = {
  page: 0,
  data: [],
  error: null,
  loading: false,
  isReachedEnd: false,
};

export const CHARACTER_COUNT_PER_PAGE = 4;

export const characterListLoading = createAction<CharacterListState>(CHARACTER_LIST_LOADING);
export const characterListSuccess = createAction<CharacterListState>(CHARACTER_LIST_SUCCESS);
export const characterListError = createAction<CharacterListState>(CHARACTER_LIST_ERROR);

const characterListSlice = createSlice({
  name: 'character-list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(characterListLoading, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(characterListSuccess, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          data: [...state.data, ...action.payload.data],
          page: state.isReachedEnd ? state.page : state.page + 1,
        };
      })
      .addCase(characterListError, (state, action) => {
        return {
          ...state,
          error: action.payload.error,
        };
      })
      .addDefaultCase(state => {
        return state;
      });
  },
});

const sagaMiddleWare = createSagaMiddleware();

const characterListStore = configureStore({
  reducer: characterListSlice.reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleWare),
});

export type CharacterListRootState = ReturnType<typeof characterListStore.getState>;
export type CharacterListDispatch = typeof characterListStore.dispatch;

export const selectCharacterListState = (state: CharacterListRootState): CharacterListState => {
  return state;
};

sagaMiddleWare.run(characterListSaga);

export default characterListStore;
