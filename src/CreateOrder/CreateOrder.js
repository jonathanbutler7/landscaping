import React, { useState } from 'react';
import { useLandscaping } from '../LandingPages/context';
import { postNewThing, validateOrder } from '../LandingPages/helpers/helpers';
import { types } from '../LandingPages/store/store';


export default function CreateOrder() {
  const { authKey, newCustomer } = useLandscaping();
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState(null);
  const [areas, setAreas] = useState([]);

  function addItem() {
    let newItem = {
      area: 'front yard',
      sqft: 100,
      trimming: 'weed eating',
    };
    let newAreas = [...areas, newItem];
    setAreas(newAreas);
    let newOrder = { ...order, items: newAreas };
    setOrder(newOrder);
  }

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
    var newOrder = { ...order, status: 'available' };
    const result = await postNewThing('orders', newOrder, authKey);
    console.log(result);
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
      <div onClick={() => addItem()}>Add an area</div>
      {areas.map((item, i) => (
        <div key={i} style={{ border: '1px solid black' }}>
          <p>{item.area}</p>
          <p>{item.sqft}</p>
          <p>{item.trimming}</p>
        </div>
      ))}
      {message && <p>{message}</p>}
      <button type='submit'>Submit</button>
    </form>
  );
}
