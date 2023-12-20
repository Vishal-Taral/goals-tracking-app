import { render } from '@testing-library/react';

import DeleteCategory from './delete-category';

describe('DeleteCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteCategory />);
    expect(baseElement).toBeTruthy();
  });
});
