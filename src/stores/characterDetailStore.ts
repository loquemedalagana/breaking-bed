import { useReducer } from 'react';
import axios from 'axios';

import {
  CHARACTER_DETAIL_ERROR,
  CHARACTER_DETAIL_INIT,
  CHARACTER_DETAIL_REQUEST,
  CHARACTER_DETAIL_SUCCESS,
  CharacterDetailActionType,
} from 'src/actions/characterDetailActions';
import restApiCharacterDetail from 'src/http/restApiCharacterDetail';
import Character from 'src/models/Character';
import rootStore from 'src/stores/rootStore';

export interface CharacterDetailState {
  loading: boolean;
  data: Character | null;
  error: Error | null | unknown;
}

export const initialState: CharacterDetailState = {
  loading: false,
  data: null,
  error: null,
};

export const characterDetailReducer = (
  state: CharacterDetailState,
  action: CharacterDetailActionType,
): CharacterDetailState => {
  switch (action.type) {
    case CHARACTER_DETAIL_INIT:
      return initialState;
    case CHARACTER_DETAIL_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case CHARACTER_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case CHARACTER_DETAIL_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
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
  getCharacterDetailInfo: (characterId: string) => Promise<void>;
  getInitCharacterDetailState: () => void;
}

const useCharacterDetailStore = (): CharacterDetailStore => {
  const [state, dispatch] = useReducer(characterDetailReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchCharacterDetail = async (characterId: string): Promise<void> => {
    dispatch({
      type: CHARACTER_DETAIL_REQUEST,
    });
    try {
      const data = await restApiCharacterDetail(characterId);
      dispatch({ type: CHARACTER_DETAIL_SUCCESS, payload: { data } });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: CHARACTER_DETAIL_ERROR,
          payload: {
            error: {
              ...e.response,
              type: 'character-detail',
            },
          },
        });
      } else {
        dispatch({
          type: CHARACTER_DETAIL_ERROR,
          payload: {
            error: {
              type: 'character-detail',
              status: undefined,
              statusText: undefined,
            },
          },
        });
      }
    }
  };

  const getCharacterDetailInfo = async (characterId: string): Promise<void> => {
    const [storedCharacterDetailData] = rootStore
      .getState()
      .characterList.data.filter(data => data.characterId === Number(characterId));
    try {
      if (storedCharacterDetailData) {
        dispatch({ type: CHARACTER_DETAIL_SUCCESS, payload: { data: storedCharacterDetailData } });
      } else {
        await fetchCharacterDetail(characterId);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: CHARACTER_DETAIL_ERROR,
          payload: {
            error: {
              ...e.response,
              type: 'character-detail',
            },
          },
        });
      } else {
        dispatch({
          type: CHARACTER_DETAIL_ERROR,
          payload: {
            error: {
              type: 'character-detail',
              status: undefined,
              statusText: undefined,
            },
          },
        });
      }
    }
  };

  const getInitCharacterDetailState = (): void => {
    dispatch({ type: CHARACTER_DETAIL_INIT });
  };

  return {
    state,
    getCharacterDetailInfo,
    getInitCharacterDetailState,
  };
};

export default useCharacterDetailStore;
