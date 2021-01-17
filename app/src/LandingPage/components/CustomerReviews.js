import React from 'react';
import classes from './CustomerReviews.module.scss';

import CarouselButtons from './CarouselButtons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { reviews, grayBlock, GoQuote } from '../../store/index';

export default function CustomerReviews() {
  return (
    <div className={classes.main}>
      <GoQuote />
      <h1>Customers trust us</h1>
      <CarouselProvider
        naturalSlideWidth={80}
        naturalSlideHeight={40}
        totalSlides={7}
        visibleSlides={3}
        infinite={true}
        isIntrinsicHeight={false}
      >
        <Slider className={classes.slider}>
          {reviews.map((review, idx) => (
            <Slide key={idx}>
              <div>
                <h5>{review.subject}</h5>
                <p>{review.title}</p>
              </div>
            </Slide>
          ))}
        </Slider>

        <CarouselButtons />
      </CarouselProvider>

      <img src={grayBlock} alt='' />
    </div>
  );
}
