import React, { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { CHARACTER_LIST_LOADING } from 'src/actions/types';
import CharacterList from 'src/components/character_list/CharacterList';
import { selectCharacterListState } from 'src/stores/characterListStore';

const CharacterListPage: React.FC = () => {
  const dispatch = useDispatch();
  const characterListState = useSelector(selectCharacterListState);
  const [bottomRef, inView] = useInView({});

  const fetchMoreData = useCallback(
    debounce(() => {
      if (!inView) return;
      dispatch({ type: CHARACTER_LIST_LOADING });
    }, 2500),
    [inView],
  );

  useEffect(fetchMoreData);

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
