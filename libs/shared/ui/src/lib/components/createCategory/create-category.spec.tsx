import { render } from '@testing-library/react';

import CreateCategory from './create-category';
import React from 'react';

describe('CreateCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCategory open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
