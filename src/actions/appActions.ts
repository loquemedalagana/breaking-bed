import { createAction } from '@reduxjs/toolkit';

import { CHANGE_ROUTE_PATH } from 'src/actions/types';
import { AppState } from 'src/stores/appStore';

export const routeChange = createAction<AppState>(CHANGE_ROUTE_PATH);
