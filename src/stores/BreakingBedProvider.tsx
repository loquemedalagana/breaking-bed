import React from "react";
import { Provider as ReduxProvider } from 'react-redux';
import rootStore from 'src/stores/rootStore';

interface Props {
  children: React.ReactNode;
}

const BreakingBedProvider: React.FC<Props> = ({ children }) => {
  return <ReduxProvider store={rootStore}>{children}</ReduxProvider>;
};

export default BreakingBedProvider;
