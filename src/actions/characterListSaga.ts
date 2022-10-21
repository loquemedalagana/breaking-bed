import { call, put, select, fork, throttle } from 'redux-saga/effects';

import { CHARACTER_LIST_ERROR, CHARACTER_LIST_REQUEST, CHARACTER_LIST_SUCCESS } from 'src/actions/characterListActions';
import restApiCharacterList from 'src/http/restApiCharacterList';
import { CharacterListState } from 'src/stores/characterListStore';

export const CHARACTER_COUNT_PER_PAGE = 4;

export function* fetchCharacterList(): Generator {
  try {
    const characterListCurrentState = (yield select(state => state)) as CharacterListState;
    const { page, isReachedEnd } = characterListCurrentState;

    if (isReachedEnd) {
      return;
    }

    const characterList = yield call(restApiCharacterList, page);
    yield put({
      type: CHARACTER_LIST_SUCCESS,
      payload: {
        data: characterList,
      },
    });
  } catch (e) {
    yield put({
      type: CHARACTER_LIST_ERROR,
      payload: {
        error: new Error((e as any).message as string),
      },
    });
  }
}

export function* watchFetchCharacterList(): Generator {
  yield throttle(3000, CHARACTER_LIST_REQUEST, fetchCharacterList);
}

export default function* rootSaga(): Generator {
  yield fork(watchFetchCharacterList);
}
