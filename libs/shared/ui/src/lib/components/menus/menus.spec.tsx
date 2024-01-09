import { render } from '@testing-library/react';

import Menus from './menus';
import React from 'react';

describe('Menus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Menus />);
    expect(baseElement).toBeTruthy();
  });
});
