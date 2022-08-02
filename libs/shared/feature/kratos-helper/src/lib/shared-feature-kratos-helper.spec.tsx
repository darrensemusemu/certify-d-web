import { render } from '@testing-library/react';

import SharedFeatureKratosHelper from './shared-feature-kratos-helper';

describe('SharedFeatureKratosHelper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFeatureKratosHelper />);
    expect(baseElement).toBeTruthy();
  });
});
