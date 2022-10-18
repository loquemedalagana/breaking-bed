import { createSlice } from '@reduxjs/toolkit';

import { routeChange } from 'src/actions/appActions';
import { RootState } from 'src/stores/rootStore';

export interface AppState {
  path: string;
}

const initialState: AppState = {
  path: '/',
};

const appSlice = createSlice<AppState, {}, 'app'>({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(routeChange, (state, action) => {
        return {
          ...state,
          path: action.payload.path,
        };
      })
      .addDefaultCase(state => {
        return {
          ...state,
        };
      });
  },
});

export const selectAppState = (state: RootState): AppState => state.app;

export default appSlice.reducer;
