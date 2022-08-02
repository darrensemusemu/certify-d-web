import { render } from '@testing-library/react';

import SharedUiProvider from './shared-ui-provider';

describe('SharedUiProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiProvider />);
    expect(baseElement).toBeTruthy();
  });
});
