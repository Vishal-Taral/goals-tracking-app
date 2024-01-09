import { render } from '@testing-library/react';

import UpdateRole from './UpdateRole';
import React from 'react';

describe('UpdateRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateRole open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } updateRoleId={null} prefilledInputData={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
