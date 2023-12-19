import { render } from '@testing-library/react';

import CreateCategory from './create-category';

describe('CreateCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCategory />);
    expect(baseElement).toBeTruthy();
  });
});
