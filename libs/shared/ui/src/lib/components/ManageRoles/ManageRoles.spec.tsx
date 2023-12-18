import { render } from '@testing-library/react';

import ManageRoles from './ManageRoles';

describe('ManageRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageRoles />);
    expect(baseElement).toBeTruthy();
  });
});
