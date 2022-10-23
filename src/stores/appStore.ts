import { createSlice } from '@reduxjs/toolkit';

import { saveScrollPosition, restoreScrollPosition } from 'src/actions/appActions';
import { RootState } from 'src/stores/rootStore';

export interface AppState {
  scrollPos: { x: number; y: number } | undefined;
}

export const initialState: AppState = {
  scrollPos: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveScrollPosition, (state, action) => {
        return {
          ...state,
          scrollPos: action.payload.scrollPos,
        };
      })
      .addCase(restoreScrollPosition, state => {
        return {
          ...state,
          scrollPos: undefined,
        };
      })
      .addDefaultCase(state => {
        return state;
      });
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;

export const selectAppState = (state: RootState): AppState => {
  return state.app;
};
