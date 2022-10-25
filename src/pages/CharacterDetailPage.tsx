import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CharacterDetail from 'src/components/character_detail/CharacterDetail';
import Loading from 'src/components/loading/Loading';
import ErrorPage from 'src/pages/ErrorPage';
import { CharacterDetailContext, RandomQuoteContext } from 'src/stores/contexts';
import { SAVE_ERROR_MESSAGE } from 'src/actions/appActions';

const CharacterDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const characterDetailStore = useContext(CharacterDetailContext);
  const randomQuoteStore = useContext(RandomQuoteContext);

  useEffect(() => {
    if (params.characterId && characterDetailStore?.state?.data === null) {
      characterDetailStore?.getCharacterDetailInfo(params.characterId);
    }

    return () => {
      characterDetailStore?.getInitCharacterDetailState();
    };
  }, []);

  useEffect(() => {
    if (characterDetailStore?.state?.data) {
      randomQuoteStore?.fetchCharacterRandomQuote(characterDetailStore.state.data.name);
    }

    return () => {
      randomQuoteStore?.getInitQuoteState();
    };
  }, [characterDetailStore?.state.data]);

  useEffect(() => {
    if (characterDetailStore?.state.error) {
      dispatch({
        type: SAVE_ERROR_MESSAGE,
        payload: {
          error: characterDetailStore.state.error,
        },
      });
    }
  }, [characterDetailStore?.state.error]);

  if (characterDetailStore?.state?.data) {
    return <CharacterDetail characterInfo={characterDetailStore?.state.data} />;
  }

  if (characterDetailStore?.state?.error) {
    return <ErrorPage />;
  }

  return <Loading isPageLoading={true} />;
};

export default CharacterDetailPage;
