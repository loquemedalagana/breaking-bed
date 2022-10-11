import React from 'react';
import styled from '@emotion/styled';

const CharacterDetailBox = styled.section`
  display: flex;
  flex-direction: column;

  // tablet

  // mobile
`;

interface CharacterDetailProps {
  // TODO: character info
  characterId: string;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId }) => {
  return (
    <div className="layout-space">
      <CharacterDetailBox>character detail for {characterId}</CharacterDetailBox>
    </div>
  );
};

export default CharacterDetail;
