import { call, put, select, takeEvery } from 'redux-saga/effects';

import { CharacterListState } from 'src/stores/characterListStore';
import restApiCharacterList from 'src/http/restApiCharacterList';
import { CHARACTER_LIST_ERROR, CHARACTER_LIST_LOADING, CHARACTER_LIST_SUCCESS } from 'src/actions/types';

export function* fetchCharacterList(): Generator {
  try {
    const characterListCurrentState = (yield select(state => state)) as CharacterListState;
    const { page, isReachedEnd } = characterListCurrentState;

    if (!isReachedEnd) {
      const characterList = yield call(restApiCharacterList, page);
      yield put({
        type: CHARACTER_LIST_SUCCESS,
        payload: {
          data: characterList,
          page: page + 1,
        },
      });
    }
  } catch (e) {
    yield put({
      type: CHARACTER_LIST_ERROR,
      payload: {
        error: JSON.stringify(e),
      },
    });
  }
}

export default function* characterListRootSaga(): Generator {
  yield takeEvery(CHARACTER_LIST_LOADING, fetchCharacterList);
}
