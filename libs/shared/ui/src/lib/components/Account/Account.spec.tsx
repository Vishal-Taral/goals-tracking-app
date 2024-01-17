import { render } from '@testing-library/react';

import Account from './Account';

describe('Account', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Account />);
    expect(baseElement).toBeTruthy();
  });
});
