import { createSlice } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import {
  characterDetailInit,
  characterDetailLoading,
  characterDetailError,
  characterDetailSuccess,
} from 'src/actions/characterDetailActions';
import Character from 'src/models/Character';
import { AppState } from 'src/stores/appStore';

export interface CharacterDetailState {
  loading: boolean;
  data: Character | null;
  error: Error | null | unknown;
}

const initialState: CharacterDetailState = {
  loading: false,
  data: null,
  error: null,
};

const characterDetailSlice = createSlice<CharacterDetailState, {}, 'character-detail'>({
  name: 'character-detail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const { t } = useTranslation();
    builder
      .addCase(characterDetailInit, state => {
        return initialState;
      })
      .addCase(characterDetailLoading, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(characterDetailSuccess, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload.data as Character,
          error: null,
        };
      })
      .addCase(characterDetailError, state => {
        return {
          loading: false,
          data: null,
          error: new Error(t('error:An error occurred when loading character detail')),
        };
      })
      .addDefaultCase(state => {
        return state;
      });
  },
});

// export const selectCharacterDetailState = (state: AppState): CharacterDetailState => state.characterDetail;

export default characterDetailSlice.reducer;
