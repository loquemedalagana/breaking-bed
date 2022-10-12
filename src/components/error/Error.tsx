import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const ErrorPageBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-evenly;
`;

const Error: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageBox>
      <h1>Error..</h1>
      <h2>Error code will be here</h2>
      <Button variant="contained">{t('button:go back')}</Button>
    </ErrorPageBox>
  );
};

export default Error;
