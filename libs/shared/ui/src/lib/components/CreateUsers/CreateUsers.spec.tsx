import { render } from '@testing-library/react';

import CreateUsers from './CreateUsers';
import React from 'react';

describe('CreateUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateUsers open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
