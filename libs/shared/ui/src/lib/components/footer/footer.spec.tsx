import { render } from '@testing-library/react';

import Footer from './footer';
import React from 'react';

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });
});
