import { all, fork, take } from 'redux-saga/effects';

import { SAVE_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from 'src/actions/appActions';

export function* saveErrorMessage(): Generator {
  yield take(SAVE_ERROR_MESSAGE);
}

export function* resetErrorMessage(): Generator {
  yield take(RESET_ERROR_MESSAGE);
}

export default function* rootAppSaga(): Generator {
  yield all([fork(saveErrorMessage), fork(resetErrorMessage)]);
}
