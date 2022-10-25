import { all, fork } from 'redux-saga/effects';
import rootCharacterListSaga from 'src/actions/characterListSaga';
import rootAppSaga from 'src/actions/appSaga';

export default function* rootSaga(): Generator {
  yield all([fork(rootCharacterListSaga), fork(rootAppSaga)]);
}
