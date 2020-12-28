import React, { useState } from 'react';
import CreateOrder from './CreateOrder';
import { useLandscaping } from '../context';

export default function OrderForm() {
  const [showForm, setShowForm] = useState(false);
  const { serverUrl, authKey, newCustomer } = useLandscaping();

  return (
    <div>
      <h3>Order form</h3>
      {newCustomer && (
        <>
          <p>{newCustomer.name}</p>
          <p>{newCustomer.address}</p>
          <p>{newCustomer.phone}</p>
          <p>{newCustomer.email}</p>
        </>
      )}
      <button onClick={() => setShowForm(!showForm)}>Show order form</button>
      {showForm && <CreateOrder />}
    </div>
  );
}
