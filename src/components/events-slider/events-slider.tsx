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
      spaceBetween={50}
      className={styles.dateSlider}
      navigation={true}
    >
      {events.map(event => (
        <SwiperSlide key={event.id}>
          <p>{event.year}</p>
          <p>{event.text}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
