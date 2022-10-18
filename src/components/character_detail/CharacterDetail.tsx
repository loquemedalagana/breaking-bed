import React from 'react';
import styled from '@emotion/styled';

import CharacterCard from 'src/components/character_card/CharacterCard';
import Quote from 'src/components/quote/Quote';
import Character from 'src/models/Character';

const CharacterDetailBox = styled.section`
  display: flex;
  flex-direction: column;
  margin: 32px;

  gap: 32px;
`;

interface CharacterDetailProps {
  characterInfo: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterInfo }) => {
  return (
    <div className="layout-space">
      <CharacterDetailBox>
        <CharacterCard character={characterInfo} />
        <Quote />
      </CharacterDetailBox>
    </div>
  );
};

export default CharacterDetail;
