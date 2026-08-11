import React from 'react';
import AuthPlaceholder from './AuthPlaceholder';
import { renderWithRouter } from '../test/test-utils';

describe('AuthPlaceholder', () => {
  it('renders the training starter dashboard', () => {
    renderWithRouter(<AuthPlaceholder />);

    expect(
      document.body.textContent.includes('Start with a plan you can actually keep.')
    ).toBe(true);
    expect(document.body.textContent.includes('A simple weekly rhythm')).toBe(true);
  });
});
