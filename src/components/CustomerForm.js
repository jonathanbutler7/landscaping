import React, { useState } from 'react';

export default function CustomerForm() {
  const [customer, setCustomer] = useState({});

  function handleChange(e) {
    let newCustomer = customer;
    newCustomer[e.target.name] = e.target.value;
    setCustomer(newCustomer);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(customer);
  }

  return (
    <div>
      <h3>Customer form</h3>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor=''>Name:</label>
        <input onChange={(e) => handleChange(e)} name='name' type='text' />
        <br />
        <label htmlFor=''>Phone:</label>
        <input onChange={(e) => handleChange(e)} name='phone' type='text' />
        <br />
        <label htmlFor=''>Email:</label>
        <input onChange={(e) => handleChange(e)} name='email' type='text' />
        <br />
        <label htmlFor=''>Address:</label>
        <input onChange={(e) => handleChange(e)} name='address' type='text' />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
