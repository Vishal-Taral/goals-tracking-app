import { render } from '@testing-library/react';

import PrivateLayout from './private-layout';

describe('PrivateLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrivateLayout />);
    expect(baseElement).toBeTruthy();
  });
});
