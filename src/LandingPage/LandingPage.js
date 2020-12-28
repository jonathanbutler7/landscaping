import React from 'react';
import CustomerForm from './components/CustomerForm';
import { LandscapingProvider } from './context';

export default function LandingPage({ service }) {

  return (
    <LandscapingProvider>
      <h1>{service.name} services</h1>
      <p>{service.description} services</p>
      <CustomerForm />
    </LandscapingProvider>
  );
}
