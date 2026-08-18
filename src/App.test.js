import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero name', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeInTheDocument();
});
