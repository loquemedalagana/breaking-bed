import {
  RANDOM_QUOTE_ERROR,
  RANDOM_QUOTE_INIT,
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
    case RANDOM_QUOTE_INIT:
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

export default randomQuoteReducer;
