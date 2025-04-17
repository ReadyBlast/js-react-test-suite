import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterableList } from '~src/react/FilterableList';

describe('FilterableList', () => {
  const items = ['apple', 'banana', 'grape', 'orange'];

  test('renders all items initially', () => {
    render(<FilterableList items={items} />);
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('filters items based on input value', () => {
    render(<FilterableList items={items} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'ap' } });

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('grape')).toBeInTheDocument();
    expect(screen.queryByText('banana')).toBeNull();
    expect(screen.queryByText('orange')).toBeNull();
  });

  test('shows no items if filter does not match any item', () => {
    render(<FilterableList items={items} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'zzz' } });

    items.forEach((item) => {
      expect(screen.queryByText(item)).toBeNull();
    });
  });

  test('shows all items again after clearing the input', () => {
    render(<FilterableList items={items} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'gr' } });
    expect(screen.getByText('grape')).toBeInTheDocument();
    expect(screen.queryByText('apple')).toBeNull();

    fireEvent.change(input, { target: { value: '' } });

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});