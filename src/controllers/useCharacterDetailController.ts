import { useContext } from 'react';
import useRestApiCharacterDetail from 'src/http/useRestApiCharacterDetail';
import { CharacterDetailState } from 'src/reducers/useCharacterDetailReducer';
import {
  CHARACTER_DETAIL_ERROR,
  CHARACTER_DETAIL_SUCCESS,
  RANDOM_QUOTE_ERROR,
  RANDOM_QUOTE_INIT,
  RANDOM_QUOTE_SUCCESS,
} from 'src/actions/types';
import { CharacterDetailContext, RandomQuoteContext } from 'src/stores/contexts';

export interface CharacterDetailController {
  characterDetailState: CharacterDetailState | undefined;
  // TODO: check is the Data exist??
  // TODO: if not exist, call and save
  fetchCharacterDetail: (characterId: string) => Promise<void>;
  fetchCharacterRandomQuote: (characterName: string) => Promise<void>;
  goOutFromThePage: () => void;
}

export const useCharacterDetailController = (): CharacterDetailController => {
  const restApiCharacterDetail = useRestApiCharacterDetail();
  const characterDetailReducer = useContext(CharacterDetailContext);
  const randomQuoteReducer = useContext(RandomQuoteContext);

  const fetchCharacterDetail = async (characterId: string): Promise<void> => {
    try {
      const data = await restApiCharacterDetail.getCharacterDetailById(characterId);
      characterDetailReducer?.dispatch({ type: CHARACTER_DETAIL_SUCCESS, data });
    } catch (e) {
      characterDetailReducer?.dispatch({ type: CHARACTER_DETAIL_ERROR, error: e });
    }
  };

  const fetchCharacterRandomQuote = async (characterName: string): Promise<void> => {
    try {
      const data = await restApiCharacterDetail.getRandomQuoteByCharacterName(characterName);
      randomQuoteReducer?.dispatch({ type: RANDOM_QUOTE_SUCCESS, data });
    } catch (e) {
      console.log(e);
      randomQuoteReducer?.dispatch({ type: RANDOM_QUOTE_ERROR, error: e });
    }
  };

  // dismount page
  const goOutFromThePage = (): void => {
    if (characterDetailReducer?.state.error) {
      console.log(characterDetailReducer.state.error);
    }
    // Character Info will be saved in the Context
    // randomQuoteReducer?.dispatch({ type: RANDOM_QUOTE_INIT });
  };

  return {
    characterDetailState: characterDetailReducer?.state,
    fetchCharacterDetail,
    fetchCharacterRandomQuote,
    goOutFromThePage,
  };
};

export default useCharacterDetailController;
