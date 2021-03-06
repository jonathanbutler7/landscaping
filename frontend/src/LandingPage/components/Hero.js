import React from 'react';
import classes from './Hero.module.scss';
import { img1, grayBlock } from '../../store/index';

export default function Hero({ service }) {
  return (
    <div className={classes.main}>
      <div className={classes.top}>
        <h1>{service.name} services, reimagined</h1>
        <p>{service.description}</p>
        <button className='light-button'>Book a service</button>
      </div>
      <img src={img1} alt={img1} />
      <img src={grayBlock} alt={grayBlock} style={{ width: '100%' }} />
    </div>
  );
}
