import React from 'react';

import useCharacterDetailReducer from 'src/reducers/useCharacterDetailReducer';
import useRandomQuoteReducer from 'src/reducers/useCharacterRandomQuoteReducer';

import { CharacterDetailContext, RandomQuoteContext } from 'src/stores/contexts';

interface Props {
  children: React.ReactNode;
}

// Redux Provider should be added
const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  const characterDetailReducer = useCharacterDetailReducer();
  const randomQuoteReducer = useRandomQuoteReducer();

  return (
    <CharacterDetailContext.Provider value={characterDetailReducer}>
      <RandomQuoteContext.Provider value={randomQuoteReducer}>{children}</RandomQuoteContext.Provider>
    </CharacterDetailContext.Provider>
  );
};

export default BreakingBedProvider;
