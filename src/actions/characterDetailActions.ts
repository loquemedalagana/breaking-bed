import { createAction } from '@reduxjs/toolkit';
import {
  CHARACTER_DETAIL_LOADING,
  CHARACTER_DETAIL_INIT,
  CHARACTER_DETAIL_SUCCESS,
  CHARACTER_DETAIL_ERROR,
} from 'src/actions/types';
import { CharacterDetailState } from 'src/stores/characterDetailStore';

export const characterDetailInit = createAction<CharacterDetailState>(CHARACTER_DETAIL_INIT);
export const characterDetailLoading = createAction<CharacterDetailState>(CHARACTER_DETAIL_LOADING);
export const characterDetailSuccess = createAction<CharacterDetailState>(CHARACTER_DETAIL_SUCCESS);
export const characterDetailError = createAction<CharacterDetailState>(CHARACTER_DETAIL_ERROR);
