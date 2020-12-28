import React from 'react';
import { useLandscaping } from '../context';

export default function OrderForm() {
  const { serverUrl, authKey, newCustomer } = useLandscaping();
  return (
    <div>
      <h3>Order form</h3>
      {newCustomer && {newCustomer.map()}}
    </div>
  );
}
