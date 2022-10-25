import { all, fork } from 'redux-saga/effects';

import rootSaga from 'src/actions/rootSaga';
import rootAppSaga from 'src/actions/appSaga';
import rootCharacterListSaga from 'src/actions/characterListSaga';

test('Root Saga test', () => {
  const rootGen = rootSaga();
  expect(rootGen.next().value).toEqual(all([fork(rootCharacterListSaga), fork(rootAppSaga)]));
});
