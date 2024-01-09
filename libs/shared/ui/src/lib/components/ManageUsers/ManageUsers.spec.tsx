import { render } from '@testing-library/react';

import ManageUsers from './ManageUsers';
import React from 'react';

describe('ManageUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageUsers tableData={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
