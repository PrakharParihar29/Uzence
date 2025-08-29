import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

test('renders label and placeholder', () => {
  render(<InputField label="Email" placeholder="you@example.com" />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
});

test('shows error message when invalid', () => {
  render(<InputField label="Email" value="wrong" invalid errorMessage="Invalid email" />);
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});