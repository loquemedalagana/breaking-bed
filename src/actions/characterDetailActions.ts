import Character from 'src/models/Character';

export const CHARACTER_DETAIL_INIT = 'CHARACTER_DETAIL__INIT';
export const CHARACTER_DETAIL_REQUEST = 'CHARACTER_DETAIL__REQUEST';
export const CHARACTER_DETAIL_SUCCESS = 'CHARACTER_DETAIL__SUCCESS';
export const CHARACTER_DETAIL_ERROR = 'CHARACTER_DETAIL__ERROR';

export type CharacterDetailActionType =
  | {
      type: typeof CHARACTER_DETAIL_INIT;
    }
  | {
      type: typeof CHARACTER_DETAIL_REQUEST;
    }
  | {
      type: typeof CHARACTER_DETAIL_SUCCESS;
      payload: {
        data: Character;
      };
    }
  | {
      type: typeof CHARACTER_DETAIL_ERROR;
      payload: {
        error: Error | unknown;
      };
    };
