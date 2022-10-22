import * as randomQuoteActions from 'src/actions/randomQuoteActions';
import Quote from 'src/models/Quote';
import { randomQuoteReducer, initialState } from 'src/stores/randomQuoteStore';
import mockedQuoteList from 'src/tests/mocks/mockedQuoteList';

describe('random quote reducer test', () => {
  const [RANDOM_QUOTE_INDEX_MIN, RANDOM_QUOTE_INDEX_MAX] = [1, mockedQuoteList.length - 1];
  const randomQuoteIndex = Math.floor(Math.random() * (RANDOM_QUOTE_INDEX_MAX - RANDOM_QUOTE_INDEX_MIN));
  const mockedQuoteData = new Quote(mockedQuoteList[randomQuoteIndex]);

  const loadingState = {
    loading: true,
    data: null,
    error: null,
  };

  it('should return the initial state', () => {
    // @ts-expect-error
    expect(randomQuoteReducer(undefined, { type: randomQuoteActions.RANDOM_QUOTE_INIT })).toEqual(initialState);
  });

  it('should return the loading state', () => {
    expect(randomQuoteReducer(initialState, { type: randomQuoteActions.RANDOM_QUOTE_REQUEST })).toEqual(loadingState);
  });

  it('should return the success state with data', () => {
    expect(
      randomQuoteReducer(loadingState, {
        type: randomQuoteActions.RANDOM_QUOTE_SUCCESS,
        payload: {
          data: mockedQuoteData,
        },
      }),
    ).toEqual({
      loading: false,
      error: null,
      data: mockedQuoteData,
    });
  });

  it('should return the success state without data', () => {
    expect(
      randomQuoteReducer(loadingState, {
        type: randomQuoteActions.RANDOM_QUOTE_SUCCESS,
        payload: {
          data: null,
        },
      }),
    ).toEqual({
      loading: false,
      error: null,
      data: null,
    });
  });

  it('should return the error state', () => {
    expect(
      randomQuoteReducer(loadingState, {
        type: randomQuoteActions.RANDOM_QUOTE_ERROR,
        payload: {
          error: new Error('error'),
        },
      }),
    ).toEqual({
      loading: false,
      error: new Error('error'),
      data: null,
    });
  });
});
