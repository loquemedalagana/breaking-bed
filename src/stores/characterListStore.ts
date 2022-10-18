import { createSlice } from '@reduxjs/toolkit';

import Character from 'src/models/Character';
import { characterListError, characterListLoading, characterListSuccess } from 'src/actions/characterListActions';
import { AppState } from 'src/stores/appStore';

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
          loading: false,
          error: action.payload.error,
        };
      })
      .addDefaultCase(state => {
        return state;
      });
  },
});

export const selectCharacterListState = (state: AppState): CharacterListState => state.characterList;

export default characterListSlice.reducer;