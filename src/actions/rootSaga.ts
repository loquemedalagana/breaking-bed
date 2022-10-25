import { all } from 'redux-saga/effects';
import characterListRootSaga from 'src/actions/characterListSaga';
import rootAppSaga from 'src/actions/appSaga';

export default function* rootSaga(): Generator {
  yield all([characterListRootSaga(), rootAppSaga()]);
}
