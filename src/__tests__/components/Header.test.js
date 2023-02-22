import React from 'react';
import { render } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header component', () => {
  test('renders the header title correctly', () => {
    const { getByText } = render(<Header />);
    const title = getByText('Employee Manager');
    expect(title).toBeInTheDocument();
  });
});
