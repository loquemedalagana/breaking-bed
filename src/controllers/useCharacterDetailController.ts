import useRestApiCharacterDetail from 'src/http/useRestApiCharacterDetail';
import useCharacterDetailReducer, { CharacterDetailState } from 'src/reducers/useCharacterDetailReducer';
import { CHARACTER_DETAIL_ERROR, CHARACTER_DETAIL_SUCCESS } from 'src/actions/types';

export interface CharacterDetailController {
  characterDetailState: CharacterDetailState;
  // TODO: check is the Data exist??
  // TODO: if not exist, call and save
  fetchCharacterDetail: (characterId: string) => Promise<void>;
}

export const useCharacterDetailController = (): CharacterDetailController => {
  const restApiCharacterDetail = useRestApiCharacterDetail();
  const characterDetailReducer = useCharacterDetailReducer();

  const fetchCharacterDetail = async (characterId: string): Promise<void> => {
    try {
      const data = await restApiCharacterDetail.getCharacterDetailById(characterId);
      characterDetailReducer.dispatch({ type: CHARACTER_DETAIL_SUCCESS, data });
    } catch (e) {
      characterDetailReducer.dispatch({ type: CHARACTER_DETAIL_ERROR, error: e });
    }
  };

  return {
    characterDetailState: characterDetailReducer.state,
    fetchCharacterDetail,
  };
};

export default useCharacterDetailController;
