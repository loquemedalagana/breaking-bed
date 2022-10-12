import React from 'react';
import styled from '@emotion/styled';

import Loading from 'src/components/loading/Loading';

const QuoteBox = styled.div`
  display: flex;
  flex-direction: column;
`;

interface QuoteProps {
  // text
  // button
}

// TODO: button should be added
const Quote: React.FC = () => {
  return (
    <>
      <Loading />
      <QuoteBox>Quote Should Be added</QuoteBox>
    </>
  );
};

export default Quote;
