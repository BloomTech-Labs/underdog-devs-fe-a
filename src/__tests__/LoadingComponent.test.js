import React from 'react';
import { render } from '@testing-library/react';

import { LoadingComponent } from '../components/common';

describe('Loading Common Component', () => {
  test('it should mount a div based on props', () => {
    const loading = render(<LoadingComponent />);
    const skeletonLoading = loading.findByTestId("skeleton-loading");
    expect(skeletonLoading).toBeTruthy();
  });
});
