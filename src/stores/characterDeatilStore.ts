import { useReducer } from 'react';

import {
  CHARACTER_DETAIL_ERROR,
  CHARACTER_DETAIL_LOADING,
  CHARACTER_DETAIL_SUCCESS,
  CharacterDetailActionType,
} from 'src/actions/types';
import restApiCharacterDetail from 'src/http/restApiCharacterDetail';
import Character from 'src/models/Character';

export interface CharacterDetailState {
  loading: boolean;
  data: Character | null;
  error: Error | null | unknown;
}

export const characterDetailReducer = (
  state: CharacterDetailState,
  action: CharacterDetailActionType,
): CharacterDetailState => {
  switch (action.type) {
    case CHARACTER_DETAIL_LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case CHARACTER_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case CHARACTER_DETAIL_ERROR:
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
