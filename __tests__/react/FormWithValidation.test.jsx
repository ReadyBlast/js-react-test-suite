import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormWithValidation } from '~src/react/FormWithValidation';

describe('FormWithValidation', () => {
  it('disables submit button when input is empty', () => {
    render(<FormWithValidation onSubmit={jest.fn()} />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it('enables submit button when input has value', () => {
    render(<FormWithValidation onSubmit={jest.fn()} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'test' } });
    expect(button).toBeEnabled();
  });

  it('calls onSubmit with input value on form submit', () => {
    const handleSubmit = jest.fn();
    render(<FormWithValidation onSubmit={handleSubmit} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith('hello');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
