import { createContext } from 'react';

import { RandomQuoteStore } from 'src/stores/randomQuoteStore';

export const RandomQuoteContext = createContext<RandomQuoteStore | null>(null);
