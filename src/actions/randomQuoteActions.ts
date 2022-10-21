import Quote from 'src/models/Quote';

export const RANDOM_QUOTE_INIT = 'RANDOM_QUOTE__INIT';
export const RANDOM_QUOTE_LOADING = 'RANDOM_QUOTE__LOADING';
export const RANDOM_QUOTE_SUCCESS = 'RANDOM_QUOTE__SUCCESS';
export const RANDOM_QUOTE_ERROR = 'RANDOM_QUOTE__ERROR';

export type RandomQuoteActionType =
  | {
      type: typeof RANDOM_QUOTE_INIT;
    }
  | {
      type: typeof RANDOM_QUOTE_LOADING;
    }
  | {
      type: typeof RANDOM_QUOTE_SUCCESS;
      data: Quote | null;
    }
  | {
      type: typeof RANDOM_QUOTE_ERROR;
      error: Error | unknown;
    };
