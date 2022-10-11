import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { HEADER_HEIGHT } from 'src/components/header/constants';
import { URL_CHARACTERS } from 'src/routes/routeURL';

const HeaderBox = styled.header`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: #f9ceee;
  position: fixed;
  z-index: 10;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: inherit;
    }
  }
`;

const HeaderBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.FC = () => {
  return (
    <HeaderBox>
      <HeaderBody className="layout-space">
        <Link to={URL_CHARACTERS}>Breaking Bed</Link>
        {/* Language state should be added */}
        <div>language select</div>
      </HeaderBody>
    </HeaderBox>
  );
};

export default Header;
