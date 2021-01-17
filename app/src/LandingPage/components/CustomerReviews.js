import React from 'react';
import classes from './CustomerReviews.module.scss';
import { reviews, grayBlock, GoQuote } from '../../store/index';

export default function CustomerReviews() {
  return (
    <div className={classes.main}>
      <GoQuote />
      <h1>Customers trust us</h1>
      {reviews.map((review, idx) => (
        <div key={idx}>
          <h5>{review.subject}</h5>
          <p>{review.title}</p>
        </div>
      ))}
      <img src={grayBlock} alt='' />
    </div>
  );
}
