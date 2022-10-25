import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RESET_ERROR_MESSAGE } from 'src/actions/appActions';
import SelectLanguage from 'src/components/select_language/SelectLanguage';
import Error from 'src/components/error/Error';

const ErrorPage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ERROR_MESSAGE });
    };
  }, []);

  return (
    <>
      {!params.characterId && (
        <header id="temp-header">
          <SelectLanguage />
        </header>
      )}
      <Error isErrorPage={true} is404={!params.characterId} />
    </>
  );
};

export default ErrorPage;
