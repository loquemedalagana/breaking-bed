import * as characterDetailActions from 'src/actions/characterDetailActions';
import { characterDetailReducer, initialState } from 'src/stores/characterDeatilStore';
import mockedCharacterList from 'src/tests/mocks/mockedCharacterList';
import Character, { ServerCharacterData } from 'src/models/Character';

describe('character detail reducer test', () => {
  const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 30];
  const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
  const fetchedCharacterData = mockedCharacterList.filter(data => data.char_id === randomCharacterId);
  const mockedCharacterData = new Character(fetchedCharacterData[0] as ServerCharacterData);

  const loadingState = {
    loading: true,
    data: null,
    error: null,
  };

  it('should return the initial state', () => {
    // @ts-expect-error
    expect(characterDetailReducer(undefined, { type: characterDetailActions.CHARACTER_DETAIL_INIT })).toEqual(
      initialState,
    );
  });

  it('after the request, should return the loading state', () => {
    expect(characterDetailReducer(initialState, { type: characterDetailActions.CHARACTER_DETAIL_REQUEST })).toEqual(
      loadingState,
    );
  });

  it('should return the success state', () => {
    expect(
      characterDetailReducer(loadingState, {
        type: characterDetailActions.CHARACTER_DETAIL_SUCCESS,
        payload: { data: mockedCharacterData },
      }),
    ).toEqual({
      loading: false,
      error: null,
      data: mockedCharacterData,
    });
  });

  it('should return the error state', () => {
    expect(
      characterDetailReducer(loadingState, {
        type: characterDetailActions.CHARACTER_DETAIL_ERROR,
        payload: {
          error: new Error('error'),
        },
      }),
    ).toEqual({
      loading: false,
      data: null,
      error: new Error('error'),
    });
  });
});
