import React from 'react';
import classes from './CustomerReviews.module.scss';
import CarouselButtons from './CarouselButtons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { reviews, grayBlock, GoQuote } from '../../store/index';
import CustomerRating from './CustomerRating';

export default function CustomerReviews() {
  return (
    <>
      <div className={classes.main}>
        <GoQuote />
        <h1>Customers trust us</h1>
      </div>
      <CarouselProvider
        naturalSlideWidth={80}
        naturalSlideHeight={40}
        totalSlides={6}
        visibleSlides={3}
        infinite={true}
        isIntrinsicHeight={true}
      >
        <Slider className={classes.slider}>
          {reviews.map((review, idx) => (
            <Slide key={idx}>
              <div
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '1rem',
                }}
              >
                <h4>{review.subject}</h4>
                <p>{review.title}</p>
                <CustomerRating rating={review.rating} />
              </div>
            </Slide>
          ))}
        </Slider>

        <CarouselButtons />
      </CarouselProvider>
      <div style={{ display: 'flex' }}>
        <img src={grayBlock} alt='' style={{ margin: '0 auto' }} />
      </div>
    </>
  );
}
