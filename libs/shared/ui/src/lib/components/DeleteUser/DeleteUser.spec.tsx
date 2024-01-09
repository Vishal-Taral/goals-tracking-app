import { render } from '@testing-library/react';

import DeleteUser from './DeleteUser';
import React from 'react';

describe('DeleteUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteUser open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } deleteUserId={null} />);
    expect(baseElement).toBeTruthy();
  });
});
