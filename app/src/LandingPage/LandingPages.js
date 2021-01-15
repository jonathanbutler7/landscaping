import React from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

export default function LandingPage({ service }) {
  return (
    <>
      <h1>{service.name} services</h1>
      <p>{service.description}</p>
      <CustomerForm service={service.name} />
      <CustomerReviews />
      <Footer />
    </>
  );
}
