import { call, fork, put, select, throttle } from 'redux-saga/effects';

import {
  CHARACTER_LIST_ERROR,
  CHARACTER_LIST_REQUEST,
  CHARACTER_LIST_SUCCESS,
  GET_REACHED_END,
} from 'src/actions/characterListActions';
import restApiCharacterList from 'src/http/restApiCharacterList';
import Character from 'src/models/Character';
import { CharacterListState, selectCharacterListState } from 'src/stores/characterListStore';

export function* fetchCharacterList(): Generator {
  const { page, isReachedEnd } = (yield select(selectCharacterListState)) as CharacterListState;

  try {
    if (isReachedEnd) {
      return;
    }

    const characterList = (yield call(restApiCharacterList, page)) as Character[];

    if (characterList.length > 0) {
      yield put({
        type: CHARACTER_LIST_SUCCESS,
        payload: {
          data: characterList,
        },
      });
    } else {
      yield put({
        type: GET_REACHED_END,
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

export function* watchFetchCharacterList(): Generator {
  yield throttle(3000, CHARACTER_LIST_REQUEST, fetchCharacterList);
}

export default function* rootSaga(): Generator {
  yield fork(watchFetchCharacterList);
}
