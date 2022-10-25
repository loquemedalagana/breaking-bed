import { createSlice } from '@reduxjs/toolkit';

import { saveErrorMessage, resetErrorMessage } from 'src/actions/appActions';
import { RootState } from 'src/stores/rootStore';

export interface AppState {
  error: {
    type: 'character-list' | 'character-detail' | 'quote' | undefined;
    statusCode: number | undefined;
    message: string;
  } | null;
}

export const initialState: AppState = {
  error: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveErrorMessage, (state, action) => {
        return {
          ...state,
          error: action.payload.error,
        };
      })
      .addCase(resetErrorMessage, state => {
        return {
          ...state,
          error: null,
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
