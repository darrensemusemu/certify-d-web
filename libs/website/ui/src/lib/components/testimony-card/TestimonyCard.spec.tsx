import { render } from '@testing-library/react';

import TestimonyCard from './TestimonyCard';

describe('TestimonyCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestimonyCard />);
    expect(baseElement).toBeTruthy();
  });
});
