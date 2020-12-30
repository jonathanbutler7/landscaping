import React, { useState } from 'react';
import { useLandscaping } from '../context';
import { validateCustomer } from '../helpers/helpers';
import axios from 'axios';
export default function CustomerForm() {
  const { serverUrl, authKey, setNewCustomer, mapKey } = useLandscaping();
  const [customer, setCustomer] = useState({});
  const [message, setMessage] = useState(null);
  const [smartAdd, setSmartAdd] = useState(null);
  const [autoComplete, setAutoComplete] = useState([]);

  function handleChange(e) {
    let newCustomer = customer;
    newCustomer[e.target.name] = e.target.value;
    console.log(newCustomer);
    setCustomer(newCustomer);
  }

  function handleSmartChange(e) {
    let newCustomer = customer;
    newCustomer.address = e.target.innerText;
    console.log(newCustomer);
    setCustomer(newCustomer);
  }

  function handleValidate(e) {
    e.preventDefault();
    if (!validateCustomer(customer)) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }

  async function handleSubmit(e) {
    let url = `${serverUrl}/customers`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', authKey);
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
      setNewCustomer(result);
    } catch (error) {
      setMessage(error.status);
    }
  }

  async function searchAddress(val) {
    const mapquestUrl = 'http://www.mapquestapi.com/search/v3';
    if (val.length > 2) {
      const url = `${mapquestUrl}/prediction?key=${mapKey}&limit=5&collection=adminArea,poi,address,category,franchise,airport&q=${val}`;
      try {
        const response = await axios.get(url);
        const result = response.data.results;
        setAutoComplete(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
  console.log(customer);
  return (
    <div>
      <h3>Enter your details to be taken to an order page.</h3>
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
        <label htmlFor=''>Smart address:</label>
        <input
          onChange={(e) => searchAddress(e.target.value)}
          name='address'
          type='text'
        />
        <br />
        {autoComplete.map((result, idx) => (
          <p
            key={idx}
            style={{ margin: '0' }}
            onClick={(e) => handleSmartChange(e)}
          >
            {result.displayString}
          </p>
        ))}
        {message && <p>{message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
