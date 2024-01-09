import { render } from '@testing-library/react';

import AddRole from './AddRole';
import React from 'react';

describe('AddRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddRole open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
