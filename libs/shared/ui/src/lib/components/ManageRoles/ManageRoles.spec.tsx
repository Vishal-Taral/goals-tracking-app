import { render } from '@testing-library/react';

import ManageRoles from './ManageRoles';
import React from 'react';

describe('ManageRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageRoles tableData={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
