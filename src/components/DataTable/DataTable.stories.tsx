import React from 'react';
import { DataTable } from './DataTable';
import type { Meta, StoryObj } from '@storybook/react';

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
  { id: 1, name: 'Prakhar Parihar', email: 'prakhar@example.com' },
  { id: 2, name: 'Aarav Mehta', email: 'aarav@example.com' },
  { id: 3, name: 'Ishita Rao', email: 'ishita@example.com' },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const BasicTable: Story = {
  args: {
    data,
    columns,
    loading: false,
    selectable: true,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns,
    loading: true,
    selectable: false,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns,
    loading: false,
    selectable: false,
  },
};