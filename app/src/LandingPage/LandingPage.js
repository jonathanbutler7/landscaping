import React from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import Hero from './components/Hero';

export default function LandingPage({ service }) {
  return (
    <>
      <Hero service={service} />
      <CustomerReviews />
      <CustomerForm service={service.name} />
      <Footer />
    </>
  );
}
