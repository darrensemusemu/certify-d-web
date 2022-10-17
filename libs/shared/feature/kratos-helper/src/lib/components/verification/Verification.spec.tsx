import { render } from '@testing-library/react';

import Verification from './Verification';

describe('Verification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Verification />);
    expect(baseElement).toBeTruthy();
  });
});
