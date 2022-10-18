import { takeEvery, take, put } from "redux-saga/effects";

import { CHANGE_ROUTE_PATH } from 'src/actions/types';

function* getChangeRouthPath(): Generator {
  const action = (yield take(CHANGE_ROUTE_PATH)) as { type: string; payload: any };
  console.log(action);
  yield put({
    type: CHANGE_ROUTE_PATH,
    payload: action.payload?.location,
  });
}

export default function* appRootSaga(): Generator {
  yield takeEvery(CHANGE_ROUTE_PATH, getChangeRouthPath);
}
