import React from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import { img1 } from '../store/assets/index'

export default function LandingPage({ service }) {
  return (
    <>
      <h1>{service.name} services</h1>
      <p>{service.description}</p>
      <img src={img1} alt=""/>
      <CustomerForm service={service.name} />
      <CustomerReviews />
      <Footer />
    </>
  );
}
