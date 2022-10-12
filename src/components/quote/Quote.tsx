import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import Loading from 'src/components/loading/Loading';
import { RandomQuoteContext } from 'src/stores/contexts';

const QuoteBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
`;

const QuoteText = styled.p`
  margin: 0;
`;

const Quote: React.FC = () => {
  const { t } = useTranslation();
  const randomQuote = useContext(RandomQuoteContext);

  if (randomQuote?.state.loading) {
    return <Loading />;
  }

  if (randomQuote?.state.data) {
    return (
      <QuoteBox>
        <QuoteText>{randomQuote.state.data.quote}</QuoteText>
        <Button variant="contained">{t('button:Load another quote')}</Button>
      </QuoteBox>
    );
  }

  if (randomQuote?.state.error) {
    console.log(randomQuote.state.error);
    return <QuoteBox>an error occurred!!</QuoteBox>;
  }

  return <></>;
};

export default Quote;
