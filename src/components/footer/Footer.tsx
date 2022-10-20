import React from 'react';
import { useTranslation } from 'react-i18next';
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
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterBox>
      <FooterBody className="layout-space">
        <TextBox>
          <a href="https://github.com/loquemedalagana/breaking-bed" target="_blank" rel="noopener noreferrer">
            {t('Source code is here')}
          </a>
          <p>Copyright {new Date().getFullYear()}. Created by Seongwon Kim</p>
        </TextBox>
      </FooterBody>
    </FooterBox>
  );
};

export default Footer;
