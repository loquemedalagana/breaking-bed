import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'src/App';

test('renders go to home link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Breaking Bed/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
