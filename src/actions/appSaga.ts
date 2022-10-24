import { put, select } from 'redux-saga/effects';

import { SAVE_SCROLL_POSITION, RESTORE_SCROLL_POSITION } from 'src/actions/appActions';
import { selectAppState, AppState } from 'src/stores/appStore';

export function* saveScrollPosition(): Generator {
  const characterListElement = window.document.getElementById('character-list');
  if (!characterListElement) return;
  yield put({
    type: SAVE_SCROLL_POSITION,
    payload: {
      x: characterListElement.clientWidth,
      y: characterListElement.clientHeight,
    },
  });
}

export function* restoreScrollPosition(): Generator {
  const { scrollPos } = (yield select(selectAppState)) as AppState;
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y);
    yield put({
      type: RESTORE_SCROLL_POSITION,
    });
  }
}
