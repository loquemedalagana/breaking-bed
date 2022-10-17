import { call, takeEvery, put } from 'redux-saga/effects';

import restApiCharacterList from 'src/http/restApiCharacterList';
import { CHARACTER_LIST_ERROR } from 'src/actions/types';

function* fetchCharacterList() {
  try {

  } catch (e) {
    yield put({
      type: CHARACTER_LIST_ERROR,
      error: e,
    });
  }
}

export default fetchCharacterList;
