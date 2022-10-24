import { fork } from 'redux-saga/effects';
import { watchFetchCharacterList } from 'src/actions/characterListSaga';

export default function* rootSaga(): Generator {
  yield fork(watchFetchCharacterList);
}
