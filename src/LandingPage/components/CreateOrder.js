import React, { useState } from 'react';
import { useLandscaping } from '../context';
import { types } from '../store/store';

export default function CreateOrder() {
  const { serverUrl, authKey, newCustomer } = useLandscaping();
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    console.log(e.target.value, e.target.name);
    let newOrder = order;
    newOrder[e.target.name] = e.target.value;
    setOrder(newOrder);
  }

  function handleValidate(e) {
    console.log(order);
    e.preventDefault();
    if (!order.type || !order.date_requested || !order.zip || !order.items) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }
  console.log(order);
  async function handleSubmit(e) {
    let url = `${serverUrl}/orders`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', authKey);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(order);

    var options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setMessage(`Successfully created order ${result._id}`);
    } catch (error) {
      setMessage(error.status);
    }
  }

  return (
    <div>
      <h3>order form</h3>
      <form action='' onSubmit={handleValidate}>
        <label htmlFor=''>Type:</label>
        <select onChange={(e) => handleChange(e)} name='type' id=''>
          {types.map((type, i) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <br />
        <label htmlFor=''>Date requested:</label>
        <input
          onChange={(e) => handleChange(e)}
          name='date_requested'
          type='date'
        />
        <br />
        <label htmlFor=''>Zip:</label>
        <input
          onChange={(e) => handleChange(e)}
          name='zip'
          type='text'
          defaultValue={newCustomer ? newCustomer.address : ''}
        />
        <br />
        <label htmlFor=''>Items:</label>
        <input onChange={(e) => handleChange(e)} name='items' type='text' />
        <br />
        {message && <p>{message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
