import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TokenGenerator from '../src/tockenGenerator';

describe('TokenGenerator Component', () => {
  test('renders form with input fields and buttons', () => {
    render(<TokenGenerator />);
    
    // Check if the input fields and buttons are rendered
    expect(screen.getByLabelText(/number of blue tokens/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/blue token prefix/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/blue tokens per row/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of red tokens/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/red token prefix/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/red tokens per row/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  test('displays validation error if fields are left empty', async () => {
    render(<TokenGenerator />);
    
    // Click the generate button without entering any values
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    
    // Expect validation messages
    expect(await screen.findByText(/number of blue tokens is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/blue token prefix is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/blue tokens per row is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/number of red tokens is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/red token prefix is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/red tokens per row is required/i)).toBeInTheDocument();
  });

  test('displays validation error if values are less than 1', async () => {
    render(<TokenGenerator />);
    
    // Fill inputs with values less than 1
    fireEvent.input(screen.getByLabelText(/number of blue tokens/i), { target: { value: '0' } });
    fireEvent.input(screen.getByLabelText(/blue tokens per row/i), { target: { value: '0' } });
    fireEvent.input(screen.getByLabelText(/number of red tokens/i), { target: { value: '0' } });
    fireEvent.input(screen.getByLabelText(/red tokens per row/i), { target: { value: '0' } });
    
    // Click the generate button
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    
    // Expect validation messages
   
      expect(await screen.findByText(/Must be at least 1 blue token is required/i)).toBeInTheDocument();
      expect(await screen.findByText(/Must be at least 1 row blue token is required/i)).toBeInTheDocument();
      expect(await screen.findByText(/Must be at least 1 red tokens is required/i)).toBeInTheDocument();
      expect(await screen.findByText(/Must be at least 1 row red token is required/i)).toBeInTheDocument();
    
  });

  test('generates and displays blue and red tokens correctly', async () => {
    render(<TokenGenerator />);
    
    // Fill inputs with valid values
    fireEvent.input(screen.getByLabelText(/number of blue tokens/i), { target: { value: '6' } });
    fireEvent.input(screen.getByLabelText(/blue token prefix/i), { target: { value: 'Blue-' } });
    fireEvent.input(screen.getByLabelText(/blue tokens per row/i), { target: { value: '3' } });
    fireEvent.input(screen.getByLabelText(/number of red tokens/i), { target: { value: '4' } });
    fireEvent.input(screen.getByLabelText(/red token prefix/i), { target: { value: 'Red-' } });
    fireEvent.input(screen.getByLabelText(/red tokens per row/i), { target: { value: '2' } });
    
    // Click the generate button
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    // Check the display of blue tokens
    await waitFor(() => {
      expect(screen.getByText('Blue-1')).toBeInTheDocument();
      expect(screen.getByText('Blue-2')).toBeInTheDocument();
      expect(screen.getByText('Blue-3')).toBeInTheDocument();
      expect(screen.getByText('Blue-4')).toBeInTheDocument();
      expect(screen.getByText('Blue-5')).toBeInTheDocument();
      expect(screen.getByText('Blue-6')).toBeInTheDocument();
    });

    // Check the display of red tokens
    await waitFor(() => {
      expect(screen.getByText('Red-1')).toBeInTheDocument();
      expect(screen.getByText('Red-2')).toBeInTheDocument();
      expect(screen.getByText('Red-3')).toBeInTheDocument();
      expect(screen.getByText('Red-4')).toBeInTheDocument();
    });
  });

  test('clears tokens and form values on clear button click', async () => {
    render(<TokenGenerator />);
    
    // Fill inputs and generate tokens
    fireEvent.input(screen.getByLabelText(/number of blue tokens/i), { target: { value: '6' } });
    fireEvent.input(screen.getByLabelText(/blue token prefix/i), { target: { value: 'Blue-' } });
    fireEvent.input(screen.getByLabelText(/blue tokens per row/i), { target: { value: '3' } });
    fireEvent.input(screen.getByLabelText(/number of red tokens/i), { target: { value: '4' } });
    fireEvent.input(screen.getByLabelText(/red token prefix/i), { target: { value: 'Red-' } });
    fireEvent.input(screen.getByLabelText(/red tokens per row/i), { target: { value: '2' } });
    
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    // Verify tokens are displayed
    await waitFor(() => {
      expect(screen.getByText('Blue-1')).toBeInTheDocument();
      expect(screen.getByText('Red-1')).toBeInTheDocument();
    });

    // Click the clear button
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    // Verify tokens and form values are cleared
    expect(screen.queryByText('Blue-1')).not.toBeInTheDocument();
    expect(screen.queryByText('Red-1')).not.toBeInTheDocument();

    expect(screen.getByLabelText(/number of blue tokens/i).value).toBe('');
    expect(screen.getByLabelText(/blue token prefix/i).value).toBe('');
    expect(screen.getByLabelText(/blue tokens per row/i).value).toBe('');
    expect(screen.getByLabelText(/number of red tokens/i).value).toBe('');
    expect(screen.getByLabelText(/red token prefix/i).value).toBe('');
    expect(screen.getByLabelText(/red tokens per row/i).value).toBe('');
  });
});
