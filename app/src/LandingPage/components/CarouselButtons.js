import React from 'react';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { BsChevronRight, BsChevronLeft } from '../../store/index';

export default function CarouselButtons() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ButtonBack
        style={{
          background: 'white',
          border: '1px solid #3f3f3f',
          color: '#3f3f3f',
          height: '3rem',
          width: '3rem',
          display: 'flex',
          borderRadius: '100%',
        }}
      >
        <BsChevronLeft />
      </ButtonBack>
      <ButtonNext
        style={{
          background: 'white',
          border: '1px solid #3f3f3f',
          color: '#3f3f3f',
          height: '3rem',
          width: '3rem',
          display: 'flex',
          borderRadius: '100%',
        }}
      >
        <BsChevronRight />
      </ButtonNext>
    </div>
  );
}
