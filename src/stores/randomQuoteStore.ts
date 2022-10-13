import { useReducer } from 'react';

import { RANDOM_QUOTE_ERROR, RANDOM_QUOTE_SUCCESS } from 'src/actions/types';
import useRestApiCharacterDetail from 'src/http/useRestApiCharacterDetail';
import { randomQuoteReducer, RandomQuoteState } from 'src/reducers/randomQuoteReducer';

export interface RandomQuoteStore {
  state: RandomQuoteState;
  fetchCharacterRandomQuote: (characterName: string) => Promise<void>;
}

const useRandomQuoteStore = (): RandomQuoteStore => {
  const [state, dispatch] = useReducer(randomQuoteReducer, {
    loading: false,
    data: null,
    error: null,
  });
  const restApiCharacterDetail = useRestApiCharacterDetail();

  const fetchCharacterRandomQuote = async (characterName: string): Promise<void> => {
    try {
      const data = await restApiCharacterDetail.getRandomQuoteByCharacterName(characterName);
      dispatch({ type: RANDOM_QUOTE_SUCCESS, data });
    } catch (e) {
      console.log(e);
      dispatch({ type: RANDOM_QUOTE_ERROR, error: e });
    }
  };

  return {
    state,
    fetchCharacterRandomQuote,
  };
};
export default useRandomQuoteStore;
