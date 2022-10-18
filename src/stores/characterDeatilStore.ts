import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CHARACTER_DETAIL_INIT,
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
  const { t } = useTranslation();

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
        error: new Error(t('error:An error occurred when loading character detail')),
      };
    case CHARACTER_DETAIL_INIT:
      return {
        loading: false,
        data: null,
        error: null,
      };
    default:
      return {
        loading: false,
        data: null,
        error: new Error(t('error:Unhandled action type')),
      };
  }
};

export interface CharacterDetailStore {
  state: CharacterDetailState;
  fetchCharacterDetail: (characterId: string) => Promise<void>;
  resetCharacterDetail: () => void;
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

  const resetCharacterDetail = (): void => {
    dispatch({ type: CHARACTER_DETAIL_INIT });
  };

  return {
    state,
    fetchCharacterDetail,
    resetCharacterDetail,
  };
};

export default useCharacterDetailStore;
