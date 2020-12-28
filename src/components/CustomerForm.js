import React, { useState } from 'react';
const { REACT_APP_SERVER_URL, REACT_APP_AUTH_KEY } = process.env;

export default function CustomerForm() {
  const [customer, setCustomer] = useState({});
  function handleChange(e) {
    let newCustomer = customer;
    newCustomer[e.target.name] = e.target.value;
    setCustomer(newCustomer);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `${REACT_APP_SERVER_URL}/customers`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', REACT_APP_AUTH_KEY);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(customer);

    var options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
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
