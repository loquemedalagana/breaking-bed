import React from 'react';
import styled from '@emotion/styled';

import Loading from 'src/components/loading/Loading';
import Character from 'src/models/Character';

const CharacterListPageBox = styled.section`
  display: grid;

  // tablet

  // mobile
`;

interface CharacterListProps {
  characterList?: Character[];
}

const CharacterList: React.FC<CharacterListProps> = () => {
  return (
    <div className="layout-space">
      <CharacterListPageBox>character list will be here</CharacterListPageBox>
      {/* TODO: intersection observer?? */}
      <Loading />
    </div>
  );
};

export default CharacterList;
