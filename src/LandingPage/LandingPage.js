import React from 'react';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import WorkerForm from './components/WorkerForm';
import { LandscapingProvider } from './context';

export default function LandingPage() {
  return (
    <LandscapingProvider>
      <Header />
      <CustomerForm />
      <OrderForm />
      <WorkerForm />
    </LandscapingProvider>
  );
}
