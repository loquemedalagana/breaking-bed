import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import ProviderForTest from 'src/tests/util/ProviderForTest';
import App from 'src/App';
import 'src/i18n';

test('renders go to home link', () => {
  mockAllIsIntersecting(true);
  render(
    <ProviderForTest>
      <App />
    </ProviderForTest>,
  );
  const linkElement = screen.getByText(/Breaking Bed/i);
  expect(linkElement).toBeInTheDocument();
});
