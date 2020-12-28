import React from 'react';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import WorkerForm from './components/WorkerForm';
export default function LandingPage() {
  return (
    <>
      <Header />
      <CustomerForm />
      <OrderForm />
      <WorkerForm />
    </>
  );
}
