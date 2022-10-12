import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CharacterDetail from 'src/components/character_detail/CharacterDetail';
import Loading from 'src/components/loading/Loading';
import useCharacterDetailController from 'src/controllers/useCharacterDetailController';
import ErrorPage from 'src/pages/ErrorPage';

const CharacterDetailPage: React.FC = () => {
  const params = useParams();

  const { characterDetailState, fetchCharacterDetail, goOutFromThePage, fetchCharacterRandomQuote } =
    useCharacterDetailController();

  useEffect(() => {
    if (params.characterId && characterDetailState?.data === null) {
      fetchCharacterDetail(params.characterId);
    } else if (characterDetailState?.data) {
      fetchCharacterRandomQuote(characterDetailState.data.name);
    }

    return () => {
      goOutFromThePage();
    };
  }, [characterDetailState?.data]);

  if (characterDetailState?.data) {
    return <CharacterDetail characterInfo={characterDetailState.data} />;
  }

  if (characterDetailState?.error) {
    return <ErrorPage />;
  }

  return <Loading isPageLoading={true} />;
};

export default CharacterDetailPage;
