import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { CHARACTER_LIST_REQUEST } from 'src/actions/characterListActions';
import CharacterList from 'src/components/character_list/CharacterList';
// import { selectAppState } from 'src/stores/appStore';
import { selectCharacterListState } from 'src/stores/characterListStore';

const CharacterListPage: React.FC = () => {
  const dispatch = useDispatch();
  //  const appState = useSelector(selectAppState);
  const characterListState = useSelector(selectCharacterListState);
  const [bottomRef, inView] = useInView({});

  useEffect(() => {
    if (inView && !characterListState.isReachedEnd) {
      dispatch({
        type: CHARACTER_LIST_REQUEST,
      });
    }
  }, [inView, characterListState.isReachedEnd]);

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
