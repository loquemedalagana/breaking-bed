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

const Error: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <ErrorPageBox>
      <ErrorContentBox>
        <h1>Error..</h1>
        <h2>{t('Something went wrong..')}</h2>
        <h3>{t('Please try again.')}</h3>
        <Button variant="contained" onClick={handleGoBack}>
          {t('Go back')}
        </Button>
      </ErrorContentBox>
    </ErrorPageBox>
  );
};

export default Error;
