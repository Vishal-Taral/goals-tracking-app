import { render } from '@testing-library/react';

import UpdateRole from './UpdateRole';

describe('UpdateRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdateRole />);
    expect(baseElement).toBeTruthy();
  });
});
