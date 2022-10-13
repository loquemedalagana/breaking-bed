import React from 'react';

import { CharacterDetailContext, RandomQuoteContext } from 'src/stores/contexts';
import useRandomQuoteStore from 'src/stores/randomQuoteStore';
import useCharacterDetailStore from 'src/stores/characterDeatilStore';

interface Props {
  children: React.ReactNode;
}

// Redux Provider should be added
const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  const characterDetailStore = useCharacterDetailStore();
  const randomQuoteStore = useRandomQuoteStore();

  return (
    <CharacterDetailContext.Provider value={characterDetailStore}>
      <RandomQuoteContext.Provider value={randomQuoteStore}>{children}</RandomQuoteContext.Provider>
    </CharacterDetailContext.Provider>
  );
};

export default BreakingBedProvider;
