import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import { selectAppState } from 'src/stores/appStore';

const ErrorPageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  min-height: 50vh;
`;

const ErrorContentBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  gap: 2.5rem;
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }
`;

const ErrorTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  gap: 32px;

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }
`;

type ErrorType = 'character-list' | 'character-detail' | 'quote' | '404' | undefined;

interface ErrorProps {
  isErrorPage?: boolean;
  is404?: boolean;
}

const Error: React.FC<ErrorProps> = ({ isErrorPage, is404 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const appState = useSelector(selectAppState);

  let errorMessageComponent = <></>;

  const errorType: ErrorType = is404 ? '404' : appState.error?.type;

  switch (errorType) {
    case '404':
      errorMessageComponent = (
        <Trans ns="error" i18nKey="404">
          <h2>404 Not Found</h2>
          <h3>Sorry, we can’t find that page.</h3>
        </Trans>
      );
      break;
    case 'character-list':
      errorMessageComponent = (
        <Trans ns="error" i18nKey="character-list">
          <h2>Something went wrong,<br/>when loading character list.</h2>
          <h3>Please try again.</h3>
        </Trans>
      );
      break;
    case 'character-detail':
      errorMessageComponent = (
        <Trans ns="error" i18nKey="character-detail">
          <h2>Something went wrong,<br/>when loading character detail.</h2>
          <h3>Please try again.</h3>
        </Trans>
      );
      break;
    default:
      errorMessageComponent = (
        <Trans ns="error" i18nKey="default">
          <h2>Something went wrong..</h2>
          <h3>Please try again.</h3>
        </Trans>
      );
      break;
  }

  const handleGoBack = (): void => {
    navigate(-1);
  };

  if (isErrorPage) {
    return (
      <ErrorPageBox id="error-page">
        <ErrorContentBox>
          <h1>Error..</h1>
          {errorMessageComponent}
          <Button id="go-back-button" variant="contained" onClick={handleGoBack}>
            {t('Go back')}
          </Button>
        </ErrorContentBox>
      </ErrorPageBox>
    );
  }

  return (
    <ErrorTextBox id="error-message">
      <p>{t('Something went wrong..')}</p>
    </ErrorTextBox>
  );
};

export default Error;
