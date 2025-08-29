import React, { useState, useEffect } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable } from './components/DataTable/DataTable';

function App() {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  useEffect(() => {
    if (!email) return;

    setIsCheckingEmail(true);
    const timer = setTimeout(() => {
      setIsEmailTaken(email.includes('taken'));
      setIsCheckingEmail(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [email]);

  interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  ];

  const users: User[] = [
    { id: 1, name: 'Prakhar Parihar', email: 'prakhar@example.com' },
    { id: 2, name: 'Aarav Mehta', email: 'aarav@example.com' },
    { id: 3, name: 'Ishita Rao', email: 'ishita@example.com' },
  ];

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col gap-10 items-center justify-around px-4 py-10"
      role="main"
      aria-label="User form and data table"
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-8 hover:shadow-2xl transition-shadow duration-300"
        role="form"
        aria-labelledby="form-title"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            id="form-title"
            className="text-3xl font-bold text-indigo-700 dark:text-indigo-300"
          >
            User Information Form
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please fill out the fields below. Fields marked with * are required.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <InputField
            label="Password *"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Use at least 8 characters"
            errorMessage="Too short"
            invalid={password.length < 8}
            showPasswordToggle
            showClear
            variant="outlined"
            size="md"
            theme="dark"
          />

          <InputField
            label="Cardholder Name *"
            placeholder="Full name as on card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="This must match your card"
            disabled={isSubmitting}
            variant="filled"
            size="lg"
            theme="light"
          />

          <InputField
            label="Email *"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="Email already in use"
            invalid={isEmailTaken}
            loading={isCheckingEmail}
            variant="outlined"
            size="md"
            theme="light"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setIsSubmitting(true)}
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Submit form"
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <section
        className="w-full max-w-4xl"
        role="region"
        aria-label="User data table"
      >
        <DataTable<User>
          data={users}
          columns={columns}
          loading={false}
          selectable
          onRowSelect={(rows) => console.log('Selected:', rows)}
        />
      </section>
    </main>
  );
}

export default App;