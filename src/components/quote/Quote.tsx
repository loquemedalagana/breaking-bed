import React from 'react';
import styled from '@emotion/styled';

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
  return <QuoteBox>Quote Should Be added</QuoteBox>;
};

export default Quote;
