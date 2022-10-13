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
  const randomQuoteStore = useContext(RandomQuoteContext);

  const handleQuoteRefreshButtonClick = (): void => {
    if (randomQuoteStore === null) return;
    if (randomQuoteStore.state.data) {
      randomQuoteStore.fetchCharacterRandomQuote(randomQuoteStore.state.data?.author);
    }
  };

  if (randomQuoteStore?.state.loading) {
    return <Loading />;
  }

  if (randomQuoteStore?.state.data) {
    return (
      <QuoteBox>
        <QuoteText>{randomQuoteStore.state.data.quote}</QuoteText>
        <Button
          variant="contained"
          onClick={handleQuoteRefreshButtonClick}
          disabled={!!randomQuoteStore?.state?.loading}
        >
          {t('button:Load another quote')}
        </Button>
      </QuoteBox>
    );
  }

  if (randomQuoteStore?.state.error) {
    console.log(randomQuoteStore.state.error);
    return <QuoteBox>an error occurred!!</QuoteBox>;
  }

  return <></>;
};

export default Quote;
