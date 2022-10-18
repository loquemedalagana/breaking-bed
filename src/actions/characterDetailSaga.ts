import { call, put, select } from 'redux-saga/effects';
import { CharacterDetailState } from 'src/stores/characterDetailStore';
import restApiCharacterDetail from 'src/http/restApiCharacterDetail';
import { CHARACTER_DETAIL_SUCCESS, CHARACTER_DETAIL_ERROR } from 'src/actions/types';


export function* fetchCharacterDetail(): Generator {
  try {
    console.log(window.history);
  } catch (e) {
    yield put({
      type: CHARACTER_DETAIL_ERROR,
      payload: {
        error: new Error('An error occurred when loading character detail'),
      },
    });
  }
}

export default fetchCharacterDetail;
