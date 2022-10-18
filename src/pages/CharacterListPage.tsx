import React, { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { CHARACTER_DETAIL_INIT, CHARACTER_LIST_LOADING } from "src/actions/types";
import Loading from 'src/components/loading/Loading';
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

  useEffect(() => {
    dispatch({type: CHARACTER_DETAIL_INIT});
  }, []);

  useEffect(fetchMoreData);

  if (!characterListState.error && !characterListState.data) {
    return <Loading isPageLoading={true} />;
  }

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
