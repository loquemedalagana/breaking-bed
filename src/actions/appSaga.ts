import { put, select, all, takeLatest, fork } from 'redux-saga/effects';

import { SAVE_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from 'src/actions/appActions';
import { selectAppState, AppState } from 'src/stores/appStore';

export function* saveErrorMessage(): Generator {}

export function* watchLSaveErrorMessage(): Generator {
  yield takeLatest(SAVE_ERROR_MESSAGE, saveErrorMessage);
}

export function* resetErrorMessage(): Generator {
  const { error } = (yield select(selectAppState)) as AppState;
  if (error === null) return;
  put({
    type: RESET_ERROR_MESSAGE,
  });
}

export default function* rootAppSaga(): Generator {
  yield all([fork(watchLSaveErrorMessage), fork(resetErrorMessage)]);
}
