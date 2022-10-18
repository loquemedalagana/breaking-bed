import { takeEvery } from "redux-saga/effects";
import { CHARACTER_LIST_LOADING } from "src/actions/types";
import characterListSaga from "src/actions/characterListSaga";

export default function* rootSaga(): Generator {
  yield takeEvery(CHARACTER_LIST_LOADING, characterListSaga);
}
