import { render, screen } from '@testing-library/react';
import Projects from './Projects';

test('renders the RizzLah project card', () => {
  render(<Projects />);
  expect(screen.getByText('RizzLah')).toBeInTheDocument();
  expect(screen.getByText('ChatGPT API')).toBeInTheDocument();
});
