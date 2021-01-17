import React from 'react';
import { grayBlock, img3, geometry2 } from '../../store/index';

export default function CTAs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='cta' style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className='text-block'
          style={{
            maxWidth: '30vw',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h1>Free Instant Quote</h1>
          <p>
            Quotes are upfront and prices are guaranteed. The price you see is
            the price you pay, in your driveway or at our shop. No Surprises.
          </p>
          <button className='light-button'>Call us</button>
        </div>
        <img src={img3} alt={img3} style={{ width: '50%' }} />
      </div>
      <img src={grayBlock} alt='' style={{ margin: '0 auto' }} />

      <div className='cta' style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={geometry2} alt={geometry2} style={{ width: '50%' }} />
        <div
          className='text-block'
          style={{
            maxWidth: '30vw',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h1>Car Repair on Demand</h1>
          <p>
            Quotes are upfront and prices are guaranteed. The price you see is
            the price you pay, in your driveway or at our shop. No Surprises.
          </p>
          <button className='light-button'>Book now</button>
        </div>
      </div>
      <img src={grayBlock} alt='' style={{ margin: '0 auto' }} />
    </div>
  );
}
