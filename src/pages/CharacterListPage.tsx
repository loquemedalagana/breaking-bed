import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import CharacterList from 'src/components/character_list/CharacterList';

import { selectCharacterListState } from 'src/stores/characterListStore';

const CharacterListPage: React.FC = () => {
  const characterListState = useSelector(selectCharacterListState);
  const [bottomRef, inView] = useInView({});

  useEffect(() => {
    // TODO: fetch function should be called
    console.log('in bottom');
  }, [inView]);

  return (
    <CharacterList
      characterList={characterListState.data}
      isLoading={characterListState.loading}
      isReachedEnd={characterListState.isReachedEnd}
      bottomRef={bottomRef}
      bottomInView={inView}
    />
  );
};

export default CharacterListPage;
