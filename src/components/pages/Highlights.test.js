import { render, screen } from '@testing-library/react';
import Highlights from './Highlights';

test('renders all highlight tiles, badges, and stat labels', () => {
  render(<Highlights />);

  expect(screen.getByText('~/highlights')).toBeInTheDocument();

  // feature tiles
  expect(screen.getByText('CSIT Scholar')).toBeInTheDocument();
  expect(screen.getByText('Co-Founder, GrowCalth and GamEx')).toBeInTheDocument();
  expect(screen.getByText('NP Innopoly 2026')).toBeInTheDocument();
  expect(screen.getByText('1st place')).toBeInTheDocument();
  expect(screen.getByText('Web App Pentest')).toBeInTheDocument();
  expect(screen.getByText('Undisclosed target')).toBeInTheDocument();

  // absorbed impact stats
  expect(screen.getByText('GrowCalth users')).toBeInTheDocument();
  expect(screen.getByText('Funding raised')).toBeInTheDocument();
  expect(screen.getByText('Steps tracked')).toBeInTheDocument();
  expect(screen.getByText('Certifications')).toBeInTheDocument();
});
