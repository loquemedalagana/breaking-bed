import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        error: new Error(t('error:An error occurred when loading quote')),
      };
    default:
      return {
        loading: false,
        data: null,
        error: new Error(t('error:Unhandled action type')),
      };
  }
};

export interface RandomQuoteStore {
  state: RandomQuoteState;
  fetchCharacterRandomQuote: (characterName: string) => Promise<void>;
  resetCharacterRandomQuote: () => void;
}

const useRandomQuoteStore = (): RandomQuoteStore => {
  const [state, dispatch] = useReducer(randomQuoteReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchCharacterRandomQuote = async (characterName: string): Promise<void> => {
    try {
      const data = await restApiRandomQuote(characterName);
      dispatch({ type: RANDOM_QUOTE_SUCCESS, data });
    } catch (e) {
      console.log(e);
      dispatch({ type: RANDOM_QUOTE_ERROR, error: e });
    }
  };

  const resetCharacterRandomQuote = (): void => {
    dispatch({ type: RANDOM_QUOTE_INIT });
  };

  return {
    state,
    fetchCharacterRandomQuote,
    resetCharacterRandomQuote,
  };
};
export default useRandomQuoteStore;
