import { createAction } from '@reduxjs/toolkit';
import { AppState } from 'src/stores/appStore';

export const SAVE_ERROR_MESSAGE = 'SAVE__ERROR_MESSAGE';
export const RESET_ERROR_MESSAGE = 'RESTORE__ERROR_MESSAGE';

export const saveErrorMessage = createAction<AppState>(SAVE_ERROR_MESSAGE);
export const resetErrorMessage = createAction<AppState>(RESET_ERROR_MESSAGE);
