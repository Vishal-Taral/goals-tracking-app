import { render } from '@testing-library/react';

import HOCAuth from './HOCAuth';

describe('HOCAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HOCAuth />);
    expect(baseElement).toBeTruthy();
  });
});
