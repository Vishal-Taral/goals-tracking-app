import { render } from '@testing-library/react';

import DeleteRole from './DeleteRole';
import React from 'react';

describe('DeleteRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteRole open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } deleteRoleId={null} />);
    expect(baseElement).toBeTruthy();
  });
});
