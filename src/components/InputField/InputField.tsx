import React, { useState } from 'react';
import clsx from 'clsx';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
  showClear?: boolean;
  showPasswordToggle?: boolean;
  theme?: 'light' | 'dark';
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClear = false,
  showPasswordToggle = false,
  theme = 'light',
}) => {
  const [inputType, setInputType] = useState<'text' | 'password'>(type);

  const handleClear = () => {
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const baseInputClasses = clsx(
    'w-full rounded-md transition duration-200 outline-none',
    {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    }[size],
    {
      filled: 'bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500',
      outlined: 'border border-gray-300 bg-white dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      ghost: 'bg-transparent border-none focus:ring-1 focus:ring-blue-500',
    }[variant],
    {
      'text-gray-900': theme === 'light',
      'text-white': theme === 'dark',
      'border-red-500 focus:border-red-500 focus:ring-red-500': invalid,
      'opacity-50 cursor-not-allowed': disabled || loading,
    }
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-disabled={disabled}
          aria-label={label}
          className={`${baseInputClasses} pr-12 placeholder-gray-400`}
          autoComplete="off"
        />

        {showClear && value && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            aria-label="Clear input"
          >
            ×
          </button>
        )}

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700 p-1 rounded-full transition"
            aria-label="Toggle password visibility"
          >
            {inputType === 'password' ? (
              <HiEye className="w-5 h-5" />
            ) : (
              <HiEyeOff className="w-5 h-5" />
            )}
          </button>
        )}

        {loading && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 animate-pulse">
            ⏳
          </span>
        )}
      </div>

      <div className="text-xs mt-1 min-h-[1rem]">
        {invalid && errorMessage ? (
          <span className="text-red-500">{errorMessage}</span>
        ) : (
          helperText && (
            <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
          )
        )}
      </div>
    </div>
  );
};