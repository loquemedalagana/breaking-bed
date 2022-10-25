import React from 'react';
import { useParams } from 'react-router-dom';

import SelectLanguage from 'src/components/select_language/SelectLanguage';
import Error from 'src/components/error/Error';

const ErrorPage: React.FC = () => {
  const params = useParams();

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
