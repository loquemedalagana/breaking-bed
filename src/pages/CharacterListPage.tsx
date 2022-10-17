import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { CHARACTER_LIST_LOADING, FETCH_CHARACTER_LIST_SAGA } from "src/actions/types";
import CharacterList from 'src/components/character_list/CharacterList';
import { selectCharacterListState } from 'src/stores/characterListStore';

const CharacterListPage: React.FC = () => {
  const dispatch = useDispatch();
  const characterListState = useSelector(selectCharacterListState);
  const [bottomRef, inView] = useInView({});

  useEffect(() => {
    // TODO: fetch function should be called
    console.log('in bottom');
  }, [inView]);

  useEffect(() => {
    dispatch({ type: CHARACTER_LIST_LOADING });
  }, []);

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
