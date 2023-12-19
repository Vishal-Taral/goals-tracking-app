import { render } from '@testing-library/react';

import AddRole from './AddRole';

describe('AddRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddRole />);
    expect(baseElement).toBeTruthy();
  });
});
