import { render } from '@testing-library/react';

import UserDetailSection from './user-detail-section';

describe('UserDetailSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserDetailSection />);
    expect(baseElement).toBeTruthy();
  });
});
