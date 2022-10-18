import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CharacterDetail from 'src/components/character_detail/CharacterDetail';
import Loading from 'src/components/loading/Loading';
import ErrorPage from 'src/pages/ErrorPage';

const CharacterDetailPage: React.FC = () => {
  const params = useParams();
/*
  useEffect(() => {
    if (params.characterId && characterDetailStore?.state?.data === null) {
      characterDetailStore?.fetchCharacterDetail(params.characterId);
    } else if (characterDetailStore?.state?.data) {
      randomQuoteStore?.fetchCharacterRandomQuote(characterDetailStore.state.data.name);
    }

    return () => {
      characterDetailStore?.resetCharacterDetail();
      randomQuoteStore?.resetCharacterRandomQuote();
    };
  }, []);

  if (characterDetailStore?.state?.data) {
    return <CharacterDetail characterInfo={characterDetailStore?.state.data} />;
  }

  if (characterDetailStore?.state?.error) {
    return <ErrorPage />;
  }
*/
  return <Loading isPageLoading={true} />;
};

export default CharacterDetailPage;
