import React from 'react';
import classes from './CTAs.module.scss';
import { grayBlock, ctas } from '../../store/index';

export default function CTAs() {
  return (
    <div className={classes.main}>
      {ctas.map((cta, i) => (
        <>
          {i % 2 === 0 ? (
            <div className={classes.cta}>
              <div className={classes.textBlock}>
                <h1>{cta.title}</h1>
                <p>{cta.content}</p>
                <button className='light-button'>{cta.button}</button>
              </div>
              <img src={cta.img} alt={cta.img} style={{ width: '50%' }} />
            </div>
          ) : (
            <div
              className={classes.cta}
              style={{ background: 'rgb(239 236 236 / 21%)' }}
            >
              <img src={cta.img} alt={cta.img} style={{ width: '50%' }} />
              <div className={classes.textBlock}>
                <h1>{cta.title}</h1>
                <p>{cta.content}</p>
                <button className='light-button'>{cta.button}</button>
              </div>
            </div>
          )}
        </>
      ))}
      <img src={grayBlock} alt='' style={{ margin: '0 auto' }} />
    </div>
  );
}
