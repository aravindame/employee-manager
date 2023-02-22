import React from 'react';
import { render } from '@testing-library/react';
import { EmployeeButtonGroup } from '@/components/EmployeeButtonGroup';

describe('EmployeeButtonGroup component', () => {
  test('renders add employee button correctly', () => {
    const { getByText } = render(<EmployeeButtonGroup />);
    const addButton = getByText('Add Employee');
    expect(addButton).toBeInTheDocument();
  });
});
