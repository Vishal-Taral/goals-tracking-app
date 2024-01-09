import { render } from '@testing-library/react';

import UpdateUser from './UpdateUser';
import React from 'react';

describe('UpdateUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateUser open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } prefilledInputData={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
