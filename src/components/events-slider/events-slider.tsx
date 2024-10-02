import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import { SliderArrow } from '../icons';
// import classNames from 'classnames';
import { Events } from '../../app.types';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './style.module.scss';

type Props = {
  events: Events;
};

export const EventsSlider: React.FC<Props> = ({ events }) => {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={40}
      // slidesOffsetBefore={50}
      // slidesOffsetAfter={50}
      className={styles.eventSlider}
      navigation={true}
    >
      {events.map(event => (
        <SwiperSlide key={event.id}>
          <div className={styles.eventSlider_event}>
            <p className={styles.eventSlider_title}>{event.year}</p>
            <p className={styles.eventSlider_text}>{event.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
