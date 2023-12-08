import { render } from '@testing-library/react';

import Update from './update';

describe('Update', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Update />);
    expect(baseElement).toBeTruthy();
  });
});
