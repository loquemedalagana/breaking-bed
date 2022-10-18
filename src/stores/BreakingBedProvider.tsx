import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import appStore from 'src/stores/appStore';

interface Props {
  children: React.ReactNode;
}

const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  return <ReduxProvider store={appStore}>{children}</ReduxProvider>;
};

export default BreakingBedProvider;
