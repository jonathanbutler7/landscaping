import React from 'react';
import Header from '../components/Header';
import CustomerForm from './components/CustomerForm';
import Nav from '../components/Nav';
import { LandscapingProvider } from './context';

export default function LandingPage({ service }) {
  return (
    <LandscapingProvider>
      <h1>{service} services</h1>
      <CustomerForm />
    </LandscapingProvider>
  );
}
