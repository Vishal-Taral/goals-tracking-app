import { render } from '@testing-library/react';

import DeleteRole from './DeleteRole';

describe('DeleteRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteRole />);
    expect(baseElement).toBeTruthy();
  });
});
