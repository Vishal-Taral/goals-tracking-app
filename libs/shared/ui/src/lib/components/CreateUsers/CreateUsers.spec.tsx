import { render } from '@testing-library/react';

import CreateUsers from './CreateUsers';

describe('CreateUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateUsers />);
    expect(baseElement).toBeTruthy();
  });
});
