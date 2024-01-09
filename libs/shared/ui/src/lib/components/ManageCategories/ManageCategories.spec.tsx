import { render } from '@testing-library/react';

import ManageCategories from './ManageCategories';
import React from 'react';

describe('ManageCategories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageCategories tableData={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
