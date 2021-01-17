import React from 'react';
import classes from './CTAs.module.scss';
import { grayBlock, img3, geometry2, ctas } from '../../store/index';

export default function CTAs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {ctas.map((cta, i) => (
        <div className={classes.cta}>
          <div className={classes.textBlock}>
            <h1>{cta.title}</h1>
            <p>{cta.content}</p>
            <button className='light-button'>{cta.button}</button>
          </div>
          <img src={cta.img} alt={cta.img} style={{ width: '50%' }} />
        </div>
      ))}
      <img src={grayBlock} alt='' style={{ margin: '0 auto' }} />
    </div>
  );
}
