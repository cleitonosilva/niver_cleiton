import React from 'react';
import { BirthdayInvite } from './components/BirthdayInvite';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="relative">
      <BirthdayInvite />
      <Toaster position="top-right" />
    </div>
  );
}