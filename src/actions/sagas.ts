import { all } from 'redux-saga/effects';

import characterDetailSaga from 'src/actions/characterDetailSaga';
import characterListSaga from 'src/actions/characterListSaga';
import appSaga from 'src/actions/appSaga';

export default function* rootSaga(): Generator {
  yield all([characterListSaga(), characterDetailSaga(), appSaga()]);
}
