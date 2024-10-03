import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderArrow } from '../icons';
import { Navigation } from 'swiper/modules';
import { Events } from '../../app.types';
import classNames from 'classnames';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './style.module.scss';

type Props = {
  events: Events;
};

export const EventsSlider: React.FC<Props> = ({ events }) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current.swiper;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button
          className={classNames(styles.navigation_button, {
            [styles.navigation_button_hide]: isBeginning,
          })}
          onClick={handlePrev}
        >
          <SliderArrow />
        </button>

        <button
          className={classNames(styles.navigation_button, styles.navigation_button_next, {
            [styles.navigation_button_hide]: isEnd,
          })}
          onClick={handleNext}
        >
          <SliderArrow />
        </button>
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView="auto"
        className={styles.eventSlider}
        grabCursor
        onSlideChange={() => handleSlideChange()}
        breakpoints={{
          300: {
            spaceBetween: 30,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
          1024: {
            spaceBetween: 80,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {events.map(event => (
          <SwiperSlide className={styles.eventSlider_slide} key={event.id}>
            <div className={styles.eventSlider_event}>
              <p className={styles.eventSlider_title}>{event.year}</p>
              <p className={styles.eventSlider_text}>{event.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
