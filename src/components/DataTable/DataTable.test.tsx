import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof User, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof User, sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Prakhar', email: 'prakhar@example.com' },
];

test('renders table headers and rows', () => {
  render(<DataTable<User> data={data} columns={columns} />);
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Prakhar')).toBeInTheDocument();
});