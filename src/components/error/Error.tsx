import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const ErrorPageBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-evenly;
`;

interface ErrorProps {
  isErrorPage?: boolean;
  errorMessage?: string;
}

const Error: React.FC<ErrorProps> = ({isErrorPage, errorMessage}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1);
  };

  return isErrorPage ? (
    <ErrorPageBox>
      <h1>{t('error:Error..')}</h1>
      <h2>{t('error:Something went wrong..')}</h2>
      <Button variant="contained" onClick={handleGoBack}>
        {t('button:go back')}
      </Button>
    </ErrorPageBox>
  ) : (
    <div>{errorMessage}</div>
  );
};

export default Error;
