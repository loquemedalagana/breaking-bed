import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from 'src/i18n';

interface ProviderForTestProps {
  children: React.ReactNode;
}

const ProviderForTest: React.FC<ProviderForTestProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default ProviderForTest;
