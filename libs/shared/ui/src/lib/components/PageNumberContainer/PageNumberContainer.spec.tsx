import { render } from '@testing-library/react';

import PageNumberContainer from './PageNumberContainer';

describe('PageNumberContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageNumberContainer />);
    expect(baseElement).toBeTruthy();
  });
});
