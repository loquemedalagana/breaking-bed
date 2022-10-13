import { createContext } from 'react';

import { RandomQuoteStore } from 'src/stores/randomQuoteStore';
import { CharacterDetailStore } from 'src/stores/characterDeatilStore';

export const CharacterDetailContext = createContext<CharacterDetailStore | null>(null);
export const RandomQuoteContext = createContext<RandomQuoteStore | null>(null);
