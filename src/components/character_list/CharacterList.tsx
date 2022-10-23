import React, { LegacyRef } from 'react';
import styled from '@emotion/styled';

import CharacterCard from 'src/components/character_card/CharacterCard';
import Loading from 'src/components/loading/Loading';
import { DEVICE_MOBILE_WIDTH, DEVICE_TABLET_WIDTH } from 'src/device/devices';
import Character from 'src/models/Character';

const CharacterListPageWrapper = styled.div`
  margin-bottom: 2rem;
`;

const CharacterListPageBox = styled.section`
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  gap: 10px;
  justify-content: center;

  // tablet
  @media screen and (max-width: ${DEVICE_TABLET_WIDTH}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // mobile
  @media screen and (max-width: ${DEVICE_MOBILE_WIDTH}px) {
    grid-template-columns: 1fr;
  }
`;

const BottomSection = styled.div``;

interface CharacterListProps {
  characterList: Character[];
  isReachedEnd: boolean;
  isLoading: boolean;
  bottomRef: (node: Element) => void;
  bottomInView: boolean;
}

const CharacterList: React.FC<CharacterListProps> = ({ characterList, isReachedEnd, isLoading, bottomRef }) => {
  return (
    <CharacterListPageWrapper id="character-list" className="layout-space">
      <CharacterListPageBox>
        {characterList.map((characterListItem, index) => (
          <CharacterCard isListItem={true} character={characterListItem} key={`character-list-item${index}`} />
        ))}
      </CharacterListPageBox>
      {isLoading ? (
        <Loading />
      ) : (
        <BottomSection id="character-list-bottom" ref={bottomRef as LegacyRef<HTMLDivElement>} />
      )}
    </CharacterListPageWrapper>
  );
};

export default CharacterList;
