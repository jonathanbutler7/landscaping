import React, { useState } from 'react';
import { useLandscaping } from '../context';
import { postNewThing, validateCustomer } from '../helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default function CustomerForm({ service }) {
  const { authKey, mapKey } = useLandscaping();
  const [customer, setCustomer] = useState({});
  const [message, setMessage] = useState(null);
  const [autoComplete, setAutoComplete] = useState([]);

  function handleChange(e) {
    let newCustomer = customer;
    if (e.target.innerText) {
      newCustomer.address = e.target.innerText;
    } else {
      newCustomer[e.target.name] = e.target.value;
    }
    setCustomer(newCustomer);
  }

  async function searchAddress(e) {
    handleChange(e);
    const val = e.target.value;
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

  function handleValidate(e) {
    e.preventDefault();
    if (!validateCustomer(customer)) {
      setMessage('All fields are required.');
    } else {
      handleSubmit(e);
    }
  }

  async function handleSubmit(e) {
    const result = await postNewThing('customers', customer, authKey);
    console.log(result);
  }

  return (
    <div>
      <h3>Enter your details to place an order for {service}.</h3>
      <form action='' onSubmit={handleValidate}>
        <label htmlFor=''>Name:</label>
        <br />
        <input onChange={(e) => handleChange(e)} name='name' type='text' />
        <br />
        <label htmlFor=''>Phone:</label>
        <br />
        <input onChange={(e) => handleChange(e)} name='phone' type='text' />
        <br />
        <label htmlFor=''>Email:</label>
        <br />
        <input onChange={(e) => handleChange(e)} name='email' type='text' />
        <br />
        <Autocomplete
          id='combo-box-demo'
          options={autoComplete}
          getOptionLabel={(option) => option.displayString}
          style={{ width: 300 }}
          onInputChange={(e) => searchAddress(e)}
          renderInput={(params) => (
            <TextField {...params} label='Combo box' variant='outlined' />
          )}
        />
        <br />
        {message && <p>{message}</p>}
        <button className="button" type='submit'>Submit</button>
      </form>
    </div>
  );
}
