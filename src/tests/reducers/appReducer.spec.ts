import * as appActions from 'src/actions/appActions';
import { appReducer, AppState, initialState } from 'src/stores/appStore';

describe('app reducer test', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('save scroll position', () => {
    expect(
      appReducer(undefined, {
        type: appActions.saveScrollPosition,
        payload: {
          scrollPos: {
            x: 50,
            y: 1500,
          },
        },
      }),
    ).toEqual({
      ...initialState,
      scrollPos: {
        x: 50,
        y: 1500,
      },
    });
  });

  it('restore scroll position', () => {
    expect(
      appReducer(
        {
          scrollPos: {
            x: 50,
            y: 1500,
          },
        },
        { type: appActions.restoreScrollPosition },
      ),
    ).toEqual(initialState);
  });
});
