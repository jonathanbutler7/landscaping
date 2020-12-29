import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      <h2>
        {' '}
        <Link to='/gutters'>Landing Page</Link>{' '}
      </h2>
      <h2>
        {' '}
        <Link to='/order'>Order</Link>{' '}
      </h2>
      <h2>
        {' '}
        <Link to='/worker'>Worker</Link>
      </h2>
    </nav>
  );
}
