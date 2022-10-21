import { createAction } from '@reduxjs/toolkit';
import { CharacterListState } from 'src/stores/characterListStore';

export const CHARACTER_LIST_REQUEST = 'CHARACTER_LIST_REQUEST';
export const CHARACTER_LIST_LOADING = 'CHARACTER_LIST__LOADING';
export const CHARACTER_LIST_SUCCESS = 'CHARACTER_LIST__SUCCESS';
export const CHARACTER_LIST_ERROR = 'CHARACTER_LIST__ERROR';

export const characterListLoading = createAction<CharacterListState>(CHARACTER_LIST_LOADING);
export const characterListSuccess = createAction<CharacterListState>(CHARACTER_LIST_SUCCESS);
export const characterListError = createAction<CharacterListState>(CHARACTER_LIST_ERROR);
