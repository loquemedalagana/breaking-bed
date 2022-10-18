import { createSlice } from "@reduxjs/toolkit";

import Character from "src/models/Character";
import { characterListError, characterListLoading, characterListSuccess } from "src/actions/characterListActions";
import { RootState } from "src/stores/rootStore";

export interface CharacterListState {
  page: number;
  data: Character[];
  loading: boolean;
  error: string | null;
  isReachedEnd: boolean;
}
export const initialState: CharacterListState = {
  page: 0,
  data: [],
  error: null,
  loading: false,
  isReachedEnd: false,
};

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

export const selectCharacterListState = (state: RootState): CharacterListState => state.characterList;

export default characterListSlice.reducer;
