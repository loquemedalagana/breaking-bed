import { createContext } from 'react';

import { CharacterDetailReducer } from 'src/reducers/useCharacterDetailReducer';
import { RandomQuoteReducer } from 'src/reducers/useCharacterRandomQuoteReducer';

export const CharacterDetailContext = createContext<CharacterDetailReducer | null>(null);
export const RandomQuoteContext = createContext<RandomQuoteReducer | null>(null);
