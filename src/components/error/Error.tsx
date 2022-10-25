import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

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

interface ErrorProps {
  isErrorPage?: boolean;
  is404?: boolean;
  errorType?: 'character-list' | 'character-detail' | 'quote';
}

const Error: React.FC<ErrorProps> = ({ isErrorPage, is404, errorType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1);
  };

  if (isErrorPage) {
    return (
      <ErrorPageBox id="error-page">
        <ErrorContentBox>
          <h1>Error..</h1>
          <h2>{is404 ? t('404 Not Found') : t('Something went wrong..')}</h2>
          <h3>{is404 ? t('Sorry, we can’t find that page') : t('Please try again.')}</h3>
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
