import React from 'react';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { HEADER_HEIGHT } from 'src/components/header/constants';
import { FOOTER_HEIGHT } from 'src/components/footer/constants';

const itemLoader = keyframes`
  0% {
    box-shadow: -38px -12px ,  -14px 0,  14px 0, 38px 0;
  }
  33% {
    box-shadow: -38px 0px, -14px -12px,  14px 0, 38px 0;
  }
  66% {
    box-shadow: -38px 0px , -14px 0, 14px -12px, 38px 0;
  }
  100% {
    box-shadow: -38px 0 , -14px 0, 14px 0 , 38px -12px;
  }
`;

const ItemLoader = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: #abd9ff;
  box-sizing: border-box;
  animation: ${itemLoader} 1s linear infinite alternate;
`;

const LoadingPageBox = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px);
  align-items: center;
  justify-content: center;
`;

const pageLoading = keyframes`
  0% , 20% {
    opacity: 1;
    letter-spacing: 2px;
  }
  80% , 100% {
    opacity: 0;
    letter-spacing: 32px;
  }
`;

const PageLoader = styled.span`
  font-size: 48px;
  font-weight: 600;
  display: inline-block;
  letter-spacing: 2px;
  font-family: Arial, Helvetica, sans-serif;
  color: #abd9ff;
  box-sizing: border-box;
  animation: ${pageLoading} 2s linear infinite alternate;
`;

interface LoadingProps {
  isPageLoading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isPageLoading }) => {
  const { t } = useTranslation();

  if (isPageLoading) {
    return (
      <LoadingPageBox id="page-loading">
        <PageLoader>{t('Loading')}</PageLoader>
      </LoadingPageBox>
    );
  }
  return <ItemLoader id="item-loading" />;
};

export default Loading;
