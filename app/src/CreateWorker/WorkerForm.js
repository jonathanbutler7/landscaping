import React, { useState } from 'react';
import { services } from '../store/index';
import { useLandscaping } from '../LandingPage/context';
import { validateWorker, postNewThing } from '../LandingPage/helpers/helpers';

export default function WorkerForm() {
  const { authKey } = useLandscaping();
  const [worker, setWorker] = useState({});
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    let newWorker = worker;
    if (e.target.name === 'services') {
      newWorker[e.target.name] = [e.target.value];
    } else {
      newWorker[e.target.name] = e.target.value;
    }
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
    const result = await postNewThing('workers', worker, authKey);
    setMessage(`Successfully created worker with id: ${result._id}`);
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
          {services.map(({name}, i) => (
            <option key={i} value={name}>
              {name}
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
