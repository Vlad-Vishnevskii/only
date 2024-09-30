import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DATE_SLIDES } from '../../constants';

import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { SliderArrow } from '../icons';
import classNames from 'classnames';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './style.module.scss';

export const DatesSlider: React.FC = () => {
  const swiperRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState(DATE_SLIDES[0]);
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
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      setActiveSlide(DATE_SLIDES[swiper.activeIndex]);
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <>
      <p>{`${activeSlide.dateStart} ${activeSlide.dateEnd}`}</p>
      <div className={styles.navigation}>
        <button onClick={handlePrev} className={styles.navigation_btn} disabled={isBeginning}>
          <SliderArrow />
        </button>
        <button
          onClick={handleNext}
          className={classNames(styles.navigation_btn, styles.navigation_btn_next)}
          disabled={isEnd}
        >
          <SliderArrow />
        </button>
      </div>
      <Swiper
        modules={[EffectFade, Pagination, Navigation]}
        effect={'fade'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        fadeEffect={{ crossFade: true }}
        className={styles.dateSlider}
        ref={swiperRef}
        navigation={false}
        onSlideChange={handleSlideChange}
      >
        {DATE_SLIDES.map(item => (
          <SwiperSlide key={item.id}>{`${item.dateStart} ${item.dateEnd}`}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
