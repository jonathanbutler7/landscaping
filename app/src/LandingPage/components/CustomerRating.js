import React from 'react';
import { AiFillStar, AiOutlineStar } from '../../store/index';
export default function CustomerRating({ rating }) {
  const stars = new Array(5).fill(false).map((_, i) => i < rating);
  return (
    <div>
      {stars.map((star, i) =>
        star ? <AiFillStar style={{color: 'gold'}} key={i} /> : <AiOutlineStar key={i} />
      )}
    </div>
  );
}
