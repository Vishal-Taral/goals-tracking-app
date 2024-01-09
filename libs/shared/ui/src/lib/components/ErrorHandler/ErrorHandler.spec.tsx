import { render } from '@testing-library/react';

import ErrorHandler from './ErrorHandler';
import React from 'react';

describe('ErrorHandler', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorHandler />);
    expect(baseElement).toBeTruthy();
  });
});
