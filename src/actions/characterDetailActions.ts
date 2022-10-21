import Character from 'src/models/Character';

export const CHARACTER_DETAIL_INIT = 'CHARACTER_DETAIL__INIT';
export const CHARACTER_DETAIL_LOADING = 'CHARACTER_DETAIL__LOADING';
export const CHARACTER_DETAIL_SUCCESS = 'CHARACTER_DETAIL__SUCCESS';
export const CHARACTER_DETAIL_ERROR = 'CHARACTER_DETAIL__ERROR';

export type CharacterDetailActionType =
  | {
      type: typeof CHARACTER_DETAIL_INIT;
    }
  | {
      type: typeof CHARACTER_DETAIL_LOADING;
    }
  | {
      type: typeof CHARACTER_DETAIL_SUCCESS;
      data: Character;
    }
  | {
      type: typeof CHARACTER_DETAIL_ERROR;
      error: Error | unknown;
    };
