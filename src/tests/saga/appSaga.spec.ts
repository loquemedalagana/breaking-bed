import { all, take, fork } from 'redux-saga/effects';

import * as appActions from 'src/actions/appActions';
import rootAppSaga, { saveErrorMessage, resetErrorMessage } from 'src/actions/appSaga';

describe('to test app saga', () => {
  it('to test root saga', () => {
    const rootGen = rootAppSaga();
    expect(rootGen.next().value).toEqual(all([fork(saveErrorMessage), fork(resetErrorMessage)]));
  });

  it('to test save error saga', () => {
    const saveErrorGen = saveErrorMessage();
    expect(saveErrorGen.next().value).toEqual(take(appActions.SAVE_ERROR_MESSAGE));
  });

  it('to test reset error saga', () => {
    const resetErrorGen = resetErrorMessage();
    expect(resetErrorGen.next().value).toEqual(take(appActions.RESET_ERROR_MESSAGE));
  });
});
