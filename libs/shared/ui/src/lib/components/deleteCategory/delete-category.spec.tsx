import { render } from '@testing-library/react';

import DeleteCategory from './delete-category';
import React from 'react';

describe('DeleteCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteCategory open={false} handleClose={function (action: any): void {
      throw new Error('Function not implemented.');
    } } categoryId={''} categories={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
