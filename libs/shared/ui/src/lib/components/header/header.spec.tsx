import { render } from '@testing-library/react';

import Header from './header';
import React from 'react';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });
});
