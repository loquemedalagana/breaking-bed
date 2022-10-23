import { createSlice } from '@reduxjs/toolkit';

import {
  characterListError,
  characterListRequest,
  characterListSuccess,
  getReachedEnd,
} from 'src/actions/characterListActions';
import Character from 'src/models/Character';
import { RootState } from 'src/stores/rootStore';

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
export const characterListSlice = createSlice({
  name: 'character-list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(characterListRequest, state => {
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
          loading: false,
          error: action.payload.error,
        };
      })
      .addCase(getReachedEnd, (state, action) => {
        return {
          ...state,
          loading: false,
          isReachedEnd: true,
        };
      })
      .addDefaultCase(state => {
        return state;
      });
  },
});

export const characterListActions = characterListSlice.actions;
export const characterListReducer = characterListSlice.reducer;

export const selectCharacterListState = (state: RootState): CharacterListState => {
  return state.characterList;
};
