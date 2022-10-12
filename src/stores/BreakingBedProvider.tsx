import React from 'react';

import CharacterDetailProvider from 'src/stores/CharacterDetailProvider';

interface Props {
  children: React.ReactNode;
}

// Redux Provider should be added
const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  return <CharacterDetailProvider>{children}</CharacterDetailProvider>;
};

export default BreakingBedProvider;
