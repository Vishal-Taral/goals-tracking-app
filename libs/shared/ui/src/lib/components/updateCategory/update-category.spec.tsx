import { render } from '@testing-library/react';

import UpdateCategory from './update-category';
import React from 'react';

describe('UpdateCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateCategory open={false} handleClose={function (): void {
      throw new Error('Function not implemented.');
    } } selctedId={''} categoriesList={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
