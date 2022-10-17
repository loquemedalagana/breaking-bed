import { createAction } from '@reduxjs/toolkit';
import { CHARACTER_LIST_ERROR, CHARACTER_LIST_LOADING, CHARACTER_LIST_SUCCESS } from 'src/actions/types';
import { CharacterListState } from 'src/stores/characterListStore';

export const characterListLoading = createAction<CharacterListState>(CHARACTER_LIST_LOADING);
export const characterListSuccess = createAction<CharacterListState>(CHARACTER_LIST_SUCCESS);
export const characterListError = createAction<CharacterListState>(CHARACTER_LIST_ERROR);
