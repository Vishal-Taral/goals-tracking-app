import { render } from '@testing-library/react';

import ManageCategories from './ManageCategories';

describe('ManageCategories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageCategories />);
    expect(baseElement).toBeTruthy();
  });
});
