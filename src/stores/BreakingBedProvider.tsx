import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { CharacterDetailContext, RandomQuoteContext } from 'src/stores/contexts';
import useRandomQuoteStore from 'src/stores/randomQuoteStore';
import useCharacterDetailStore from 'src/stores/characterDetailStore';
import characterListStore from 'src/stores/characterListStore';

interface Props {
  children: React.ReactNode;
}

const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  const characterDetailStore = useCharacterDetailStore();
  const randomQuoteStore = useRandomQuoteStore();

  return (
    <ReduxProvider store={characterListStore}>
      <CharacterDetailContext.Provider value={characterDetailStore}>
        <RandomQuoteContext.Provider value={randomQuoteStore}>{children}</RandomQuoteContext.Provider>
      </CharacterDetailContext.Provider>
    </ReduxProvider>
  );
};

export default BreakingBedProvider;
