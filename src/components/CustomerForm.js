import React, { useState } from 'react';
const { REACT_APP_SERVER_URL, REACT_APP_AUTH_KEY } = process.env;

export default function CustomerForm() {
  const [customer, setCustomer] = useState({});
  const [message, setMessage] = useState();
  function handleChange(e) {
    let newCustomer = customer;
    newCustomer[e.target.name] = e.target.value;
    setCustomer(newCustomer);
  }

  function handleValidate(e) {
    e.preventDefault();
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }

  async function handleSubmit(e) {
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
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMessage(`Successfully created customer ${result._id}`);
    } catch (error) {
      setMessage(error.status);
    }
  }
  console.log(message);
  return (
    <div>
      <h3>Customer form</h3>
      <form action='' onSubmit={handleValidate}>
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
        {message && <p>{message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
