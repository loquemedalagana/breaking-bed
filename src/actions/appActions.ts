import { createAction } from '@reduxjs/toolkit';
import { AppState } from 'src/stores/appStore';

export const SAVE_SCROLL_POSITION = 'SAVE__SCROLL_POSITION';
export const RESTORE_SCROLL_POSITION = 'RESTORE__SCROLL_POSITION';

export const saveScrollPosition = createAction<AppState>(SAVE_SCROLL_POSITION);
export const restoreScrollPosition = createAction<AppState>(RESTORE_SCROLL_POSITION);
