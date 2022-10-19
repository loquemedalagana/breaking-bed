import { useReducer } from 'react';

import {
  RANDOM_QUOTE_ERROR,
  RANDOM_QUOTE_INIT,
  RANDOM_QUOTE_LOADING,
  RANDOM_QUOTE_SUCCESS,
  RandomQuoteActionType,
} from 'src/actions/types';
import restApiRandomQuote from 'src/http/restApiRandomQuote';
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

export interface RandomQuoteStore {
  state: RandomQuoteState;
  fetchCharacterRandomQuote: (characterName: string) => Promise<void>;
  getInitQuoteState: () => void;
}

const useRandomQuoteStore = (): RandomQuoteStore => {
  const [state, dispatch] = useReducer(randomQuoteReducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fetchCharacterRandomQuote = async (characterName: string): Promise<void> => {
    dispatch({ type: RANDOM_QUOTE_LOADING });
    try {
      const data = await restApiRandomQuote(characterName);
      dispatch({ type: RANDOM_QUOTE_SUCCESS, data });
    } catch (e) {
      console.log(e);
      dispatch({ type: RANDOM_QUOTE_ERROR, error: e });
    }
  };

  const getInitQuoteState = (): void => {
    dispatch({ type: RANDOM_QUOTE_INIT });
  };

  return {
    state,
    fetchCharacterRandomQuote,
    getInitQuoteState,
  };
};
export default useRandomQuoteStore;
