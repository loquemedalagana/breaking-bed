import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CharacterDetail from 'src/components/character_detail/CharacterDetail';
import Loading from 'src/components/loading/Loading';
import useCharacterDetailController from 'src/controllers/useCharacterDetailController';

const CharacterDetailPage: React.FC = () => {
  const params = useParams();

  const { characterDetailState, fetchCharacterDetail, goOutFromThePage } = useCharacterDetailController();

  useEffect(() => {
    if (params.characterId) {
      fetchCharacterDetail(params.characterId);
    }

    return () => {
      goOutFromThePage();
    };
  }, []);

  if (characterDetailState.data) {
    return <CharacterDetail characterInfo={characterDetailState.data} />;
  }

  if (characterDetailState.error) {
    return <>error...</>;
  }

  return <Loading isPageLoading={true} />;
};

export default CharacterDetailPage;
