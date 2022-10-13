import { useReducer } from 'react';

import { CHARACTER_DETAIL_ERROR, CHARACTER_DETAIL_SUCCESS } from 'src/actions/types';
import restApiCharacterDetail from 'src/http/restApiCharacterDetail';
import { characterDetailReducer, CharacterDetailState } from 'src/reducers/characterDetailReducer';

export interface CharacterDetailStore {
  state: CharacterDetailState;
  fetchCharacterDetail: (characterId: string) => Promise<void>;
}

const useCharacterDetailStore = (): CharacterDetailStore => {
  const [state, dispatch] = useReducer(characterDetailReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchCharacterDetail = async (characterId: string): Promise<void> => {
    try {
      const data = await restApiCharacterDetail(characterId);
      dispatch({ type: CHARACTER_DETAIL_SUCCESS, data });
    } catch (e) {
      dispatch({ type: CHARACTER_DETAIL_ERROR, error: e });
    }
  };

  return {
    state,
    fetchCharacterDetail,
  };
};

export default useCharacterDetailStore;
