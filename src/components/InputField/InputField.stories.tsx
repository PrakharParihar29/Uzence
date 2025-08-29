import React, { useState } from 'react';
import { InputField } from './InputField';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    variant: 'outlined',
    size: 'md',
    theme: 'light',
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    type: 'password',
    showPasswordToggle: true,
    showClear: true,
    value: 'secret123',
    variant: 'outlined',
    theme: 'dark',
  },
};

export const InvalidState: Story = {
  args: {
    label: 'Email',
    value: 'invalid',
    invalid: true,
    errorMessage: 'Invalid email format',
    variant: 'filled',
    theme: 'light',
  },
};