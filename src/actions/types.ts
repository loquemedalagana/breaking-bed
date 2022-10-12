import Character from 'src/models/Character';
import Quote from 'src/models/Quote';

// TODO: character list

export const CHARACTER_DETAIL_LOADING = 'CHARACTER_DETAIL__LOADING';
export const CHARACTER_DETAIL_SUCCESS = 'CHARACTER_DETAIL__SUCCESS';
export const CHARACTER_DETAIL_ERROR = 'CHARACTER_DETAIL__ERROR';

export const RANDOM_QUOTE_INIT = 'RANDOM_QUOTE__INIT';
export const RANDOM_QUOTE_LOADING = 'RANDOM_QUOTE__LOADING';
export const RANDOM_QUOTE_SUCCESS = 'RANDOM_QUOTE__SUCCESS';
export const RANDOM_QUOTE_ERROR = 'RANDOM_QUOTE__ERROR';

export type CharacterDetailActionType =
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

export type RandomQuoteActionType =
  | {
      type: typeof RANDOM_QUOTE_INIT;
    }
  | {
      type: typeof RANDOM_QUOTE_LOADING;
    }
  | {
      type: typeof RANDOM_QUOTE_SUCCESS;
      data: Quote;
    }
  | {
      type: typeof RANDOM_QUOTE_ERROR;
      error: Error | unknown;
    };
