import { render } from '@testing-library/react';

import FilterContainer from './FilterContainer';

describe('FilterContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterContainer />);
    expect(baseElement).toBeTruthy();
  });
});
