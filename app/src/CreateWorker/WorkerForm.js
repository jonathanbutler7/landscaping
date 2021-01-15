import React, { useState } from 'react';
import { types } from '../LandingPage/store/index';
import { useLandscaping } from '../LandingPage/context';
import { validateWorker } from '../LandingPage/helpers/helpers';

export default function WorkerForm() {
  const { serverUrl, authKey } = useLandscaping();
  const [worker, setWorker] = useState({});
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    let newWorker = worker;
    newWorker[e.target.name] = e.target.value;
    console.log(newWorker);
    setWorker(newWorker);
  }

  function handleValidate(e) {
    e.preventDefault();
    if (!validateWorker(worker)) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }

  async function handleSubmit(e) {
    let url = `${serverUrl}/workers`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', authKey);
    myHeaders.append('Content-Type', 'application/json');
    let newWorker = {
      address: worker.address,
      email: worker.email,
      name: worker.name,
      phone: worker.phone,
      services: [worker.services],
    };
    var raw = JSON.stringify(newWorker);
    var options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMessage(`Successfully created worker ${result._id}`);
    } catch (error) {
      setMessage(error.status);
    }
  }

  return (
    <div>
      <h3>Worker form</h3>
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
        <label htmlFor=''>Services:</label>
        <select onChange={(e) => handleChange(e)} name='services' id=''>
          <option value=''>Select an option</option>
          {types.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
        <br />
        {message && <p>{message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
