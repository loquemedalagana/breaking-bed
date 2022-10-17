import { call, takeEvery, put, select } from 'redux-saga/effects';

import restApiCharacterList from 'src/http/restApiCharacterList';
import { CHARACTER_LIST_ERROR, CHARACTER_LIST_LOADING, CHARACTER_LIST_SUCCESS } from 'src/actions/types';
import { CharacterListState } from 'src/stores/characterListStore';

function* fetchCharacterList(): Generator {
  try {
    const characterListCurrentState = (yield select(state => state)) as CharacterListState;
    const { page, isReachedEnd } = characterListCurrentState;

    if (!isReachedEnd) {
      const characterList = yield call(restApiCharacterList, page);
      yield put({
        type: CHARACTER_LIST_SUCCESS,
        payload: {
          data: characterList,
        },
      });
    }
  } catch (e) {
    yield put({
      type: CHARACTER_LIST_ERROR,
      payload: {
        error: new Error((e as any).message as string),
      },
    });
  }
}

export default function* rootSaga(): Generator {
  yield takeEvery(CHARACTER_LIST_LOADING, fetchCharacterList);
}
