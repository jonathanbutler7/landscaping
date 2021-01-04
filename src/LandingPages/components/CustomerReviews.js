import React from 'react';
import { reviews } from '../../store/content/index';
export default function CustomerReviews() {
  return (
    <div>
      {reviews.map((review) => (
        <>
          <h5>{review.subject}</h5>
          <p>{review.title}</p>
        </>
      ))}
    </div>
  );
}
