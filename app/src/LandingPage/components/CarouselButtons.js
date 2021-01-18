import React from 'react';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { BsChevronRight, BsChevronLeft } from '../../store/index';

const buttonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  height: '3rem',
  width: '3rem',
  display: 'flex',
  borderRadius: '100%',
};

export default function CarouselButtons() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ButtonBack style={buttonStyle}>
        <BsChevronLeft />
      </ButtonBack>
      <ButtonNext style={buttonStyle}>
        <BsChevronRight />
      </ButtonNext>
    </div>
  );
}
