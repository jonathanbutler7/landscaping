import React, { useState } from 'react';
import { useLandscaping } from '../context';
import { validateOrder } from '../helpers/helpers';
import { types } from '../store/store';

export default function CreateOrder() {
  const { serverUrl, authKey, newCustomer } = useLandscaping();
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    let newOrder = order;
    newOrder[e.target.name] = e.target.value;
    setOrder(newOrder);
  }

  function handleValidate(e) {
    e.preventDefault();
    if (!validateOrder(order)) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }

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
    <form action='' onSubmit={handleValidate}>
      <label htmlFor=''>Type:</label>
      <select onChange={(e) => handleChange(e)} name='type' id=''>
        <option value=''>Select an option</option>
        {types.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
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
  );
}
