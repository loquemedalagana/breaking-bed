import { Dispatch, useReducer } from 'react';

import {
  RANDOM_QUOTE_ERROR,
  RANDOM_QUOTE_LOADING,
  RANDOM_QUOTE_SUCCESS,
  RandomQuoteActionType,
} from 'src/actions/types';
import Quote from 'src/models/Quote';

export interface RandomQuoteState {
  loading: boolean;
  data: Quote | null;
  error: Error | null | unknown;
}

export const randomQuoteReducer = (state: RandomQuoteState, action: RandomQuoteActionType): RandomQuoteState => {
  switch (action.type) {
    case 'RANDOM_QUOTE__INIT':
      return {
        loading: false,
        data: null,
        error: null,
      };
    case RANDOM_QUOTE_LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case RANDOM_QUOTE_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case RANDOM_QUOTE_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return {
        loading: false,
        data: null,
        error: new Error('Unhandled action type'),
      };
  }
};

export interface RandomQuoteReducer {
  state: RandomQuoteState;
  dispatch: Dispatch<RandomQuoteActionType>;
}

const useRandomQuoteReducer = (): RandomQuoteReducer => {
  const [state, dispatch] = useReducer(randomQuoteReducer, {
    loading: false,
    data: null,
    error: null,
  });

  return {
    state,
    dispatch,
  };
};

export default useRandomQuoteReducer;
