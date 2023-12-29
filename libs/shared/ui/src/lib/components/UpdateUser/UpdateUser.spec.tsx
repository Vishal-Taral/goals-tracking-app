import { render } from '@testing-library/react';

import UpdateUser from './UpdateUser';

describe('UpdateUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateUser />);
    expect(baseElement).toBeTruthy();
  });
});
