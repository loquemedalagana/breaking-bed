import { all } from 'redux-saga/effects';
import { BrowserHistory } from 'history';

import characterDetailSaga from 'src/actions/characterDetailSaga';
import characterListSaga from 'src/actions/characterListSaga';

export default function* rootSaga(): Generator {
  yield all([characterListSaga(), characterDetailSaga()]);
}
