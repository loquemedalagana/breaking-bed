import React from 'react';
import styled from '@emotion/styled';

const CharacterListPageBox = styled.section`
  display: grid;

  // tablet

  // mobile
`;

interface CharacterListProps {
  // TODO: character list array
}

const CharacterList: React.FC<CharacterListProps> = () => {
  return (
    <div className="layout-space">
      <CharacterListPageBox>character list will be here</CharacterListPageBox>
    </div>
  );
};

export default CharacterList;
