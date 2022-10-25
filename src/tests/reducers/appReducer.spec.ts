import * as appActions from 'src/actions/appActions';
import { appReducer, AppState, initialState } from 'src/stores/appStore';

describe('app reducer test', () => {
  const sampleAppState: AppState = {
    error: {
      status: 404,
      type: 'character-detail',
      statusText: 'Not found error.',
    },
  };

  it('should return initial state', () => {
    expect(appReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('after receive the error...', () => {
    expect(
      appReducer(initialState, {
        type: appActions.SAVE_ERROR_MESSAGE,
        payload: {
          error: {
            ...sampleAppState.error,
          },
        },
      }),
    ).toEqual(sampleAppState);
  });

  it('reset the error after the error component is unmounted', () => {
    expect(appReducer(sampleAppState, { type: appActions.RESET_ERROR_MESSAGE })).toEqual({
      ...sampleAppState,
      error: null,
    });
  });
});
