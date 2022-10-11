import React from 'react';
import styled from '@emotion/styled';

import { FOOTER_HEIGHT } from 'src/components/footer/constants';

const FooterBox = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f9f3ee;
`;

const FooterBody = styled.div`
  height: inherit;
  display: flex;
  width: inherit;
  justify-content: flex-end;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 12px;
  gap: 0.25em;
  text-align: right;

  p,
  a {
    margin: 0;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterBox>
      <FooterBody className="layout-space">
        <TextBox>
          <p>Source code is here </p>
          <p>Copyright {new Date().getFullYear()}. Created by Seongwon Kim</p>
        </TextBox>
      </FooterBody>
    </FooterBox>
  );
};

export default Footer;
