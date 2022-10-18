import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CHARACTER_DETAIL_INIT, CHARACTER_DETAIL_LOADING } from 'src/actions/types';
import CharacterDetail from 'src/components/character_detail/CharacterDetail';
import Loading from 'src/components/loading/Loading';
import ErrorPage from 'src/pages/ErrorPage';
import { selectCharacterDetailState } from 'src/stores/characterDetailStore';
import { RandomQuoteContext } from 'src/stores/contexts';

const CharacterDetailPage: React.FC = () => {
  const params = useParams<{ characterId: string }>();
  const dispatch = useDispatch();
  const characterDetailState = useSelector(selectCharacterDetailState);
  const randomQuoteStore = useContext(RandomQuoteContext);

  useEffect(() => {
    if (params.characterId) {
      dispatch({ type: CHARACTER_DETAIL_LOADING });
    }

    if (characterDetailState.data) {
      randomQuoteStore?.fetchCharacterRandomQuote(characterDetailState.data.name);
    }

    return () => {
      dispatch({ type: CHARACTER_DETAIL_INIT });
      randomQuoteStore?.resetCharacterRandomQuote();
    };
  }, []);

  if (characterDetailState.data) {
    return <CharacterDetail characterInfo={characterDetailState.data} />;
  }

  if (characterDetailState.error) {
    return <ErrorPage />;
  }

  return <Loading isPageLoading={true} />;
};

export default CharacterDetailPage;
