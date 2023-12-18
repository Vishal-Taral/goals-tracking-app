import { render } from '@testing-library/react';

import UpdateCategory from './update-category';

describe('UpdateCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateCategory />);
    expect(baseElement).toBeTruthy();
  });
});
