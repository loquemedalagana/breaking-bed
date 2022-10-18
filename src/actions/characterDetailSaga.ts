import { call, put, select, takeEvery } from 'redux-saga/effects';
import { CharacterDetailState } from 'src/stores/characterDetailStore';
import restApiCharacterDetail from 'src/http/restApiCharacterDetail';

import { CHARACTER_DETAIL_SUCCESS, CHARACTER_DETAIL_ERROR, CHARACTER_DETAIL_LOADING } from 'src/actions/types';
import { RootState } from 'src/stores/rootStore';
import { CharacterListState } from 'src/stores/characterListStore';
import Character from 'src/models/Character';
import { BrowserHistory } from 'history';

function* fetchCharacterDetail(characterId: string): Generator {
  try {
    const fetchedCharacterDetailData = yield call(restApiCharacterDetail, characterId);
    yield put({
      type: CHARACTER_DETAIL_SUCCESS,
      payload: fetchedCharacterDetailData,
    });
  } catch (e) {
    yield put({
      type: CHARACTER_DETAIL_ERROR,
      payload: {
        error: JSON.stringify(e),
      },
    });
  }
}

function* getCharacterDetailInfo(): Generator {
  const characterListCurrentState = (yield select((state: RootState) => state.characterList)) as CharacterListState;

  if (characterListCurrentState.data) {
    const filteredData = (yield characterListCurrentState.data.filter(data => data.characterId)) as Character[];
    yield put({
      type: CHARACTER_DETAIL_SUCCESS,
      payload: filteredData[0],
    });
  }
}

export default function* characterDetailRootSaga(): Generator {
  yield takeEvery(CHARACTER_DETAIL_LOADING, getCharacterDetailInfo);
}
