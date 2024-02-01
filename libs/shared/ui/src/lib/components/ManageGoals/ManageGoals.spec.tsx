import { render } from '@testing-library/react';

import ManageGoals from './ManageGoals';

describe('ManageGoals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageGoals />);
    expect(baseElement).toBeTruthy();
  });
});
