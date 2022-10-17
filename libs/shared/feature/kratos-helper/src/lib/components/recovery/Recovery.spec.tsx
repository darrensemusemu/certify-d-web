import { render } from '@testing-library/react';

import Recovery from './Recovery';

describe('Recovery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Recovery />);
    expect(baseElement).toBeTruthy();
  });
});
