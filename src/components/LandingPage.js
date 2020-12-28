import React from 'react';
import Header from './Header';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';
import WorkerForm from './WorkerForm';
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
