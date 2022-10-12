import React, { createContext } from 'react';

import useCharacterDetailReducer, { CharacterDetailState } from 'src/reducers/useCharacterDetailReducer';
import useRandomQuoteReducer, { RandomQuoteState } from 'src/reducers/useCharacterRandomQuoteReducer';

export const CharacterDetailContext = createContext<CharacterDetailState | null>(null);
export const RandomQuoteContext = createContext<RandomQuoteState | null>(null);

interface Props {
  children: React.ReactNode;
}

const CharacterDetailProvider: React.FC<Props> = ({ children }) => {
  const characterDetailReducer = useCharacterDetailReducer();
  const randomQuoteReducer = useRandomQuoteReducer();
  return (
    <CharacterDetailContext.Provider value={characterDetailReducer.state}>
      <RandomQuoteContext.Provider value={randomQuoteReducer.state}>
        {children}
      </RandomQuoteContext.Provider>
    </CharacterDetailContext.Provider>
  );
};

export default CharacterDetailProvider;
