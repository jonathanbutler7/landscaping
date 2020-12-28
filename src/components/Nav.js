import React from 'react';

export default function Nav() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      <h2>
        {' '}
        <a href='#customer'>Customer</a>{' '}
      </h2>
      <h2>
        {' '}
        <a href='#customer'>Order</a>{' '}
      </h2>
      <h2>
        {' '}
        <a href='#customer'>Worker</a>{' '}
      </h2>
    </nav>
  );
}
