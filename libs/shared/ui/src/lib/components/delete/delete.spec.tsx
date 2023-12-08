import { render } from '@testing-library/react';

import Delete from './delete';

describe('Delete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Delete />);
    expect(baseElement).toBeTruthy();
  });
});
