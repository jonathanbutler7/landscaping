import React from 'react';
import CustomerForm from './components/CustomerForm';


export default function LandingPage({ service }) {

  return (
    <>
      <h1>{service.name} services</h1>
      <p>{service.description} services</p>
      <CustomerForm />
    </>
  );
}
