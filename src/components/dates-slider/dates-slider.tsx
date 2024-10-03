import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { EventsSlider } from '../events-slider';
import { SliderArrow } from '../icons';
import { DATE_SLIDES } from '../../constants';
import classNames from 'classnames';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './style.module.scss';

export const RotatingSlider: React.FC = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const [yearBlue, setYearBlue] = useState(DATE_SLIDES[0].dateStart);
  const [yearPink, setYearPink] = useState(DATE_SLIDES[0].dateEnd);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const yearBlueRef = useRef({ value: DATE_SLIDES[0].dateStart });
  const yearPinkRef = useRef({ value: DATE_SLIDES[0].dateEnd });
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dateTitleRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const anglePerSlide = 360 / DATE_SLIDES.length;
  const radius = 265;

  const rotateCircle = (index: number) => {
    const rotationAngle = -index * anglePerSlide;

    if (circleRef.current) {
      pointsRef.current.forEach(pointRef => {
        if (pointRef) {
          gsap.to(pointRef, {
            rotation: -1 * rotationAngle,
            duration: 0,
            ease: 'power2.inOut',
          });
        }
      });
      gsap.to(dateTitleRef.current, {
        rotation: -1 * rotationAngle,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(circleRef.current, {
        rotation: rotationAngle,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(yearBlueRef.current, {
        value: DATE_SLIDES[index].dateStart,
        duration: 0.3,
        ease: 'power1.out',
        onUpdate: () => {
          setYearBlue(Math.round(yearBlueRef.current.value));
        },
      });
      gsap.to(yearPinkRef.current, {
        value: DATE_SLIDES[index].dateEnd,
        duration: 0.3,
        ease: 'power1.out',
        onUpdate: () => {
          setYearPink(Math.round(yearPinkRef.current.value));
        },
      });
    }
  };

  const handleSlideChange = (index: number) => {
    const swiper = swiperRef.current;

    setCurrentSlide(index);
    setYearBlue(DATE_SLIDES[index].dateStart);
    setYearPink(DATE_SLIDES[index].dateEnd);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    rotateCircle(index);
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className={styles.dateSliderContainer}>
      <div className={styles.dateTitleMobile}>
        <span className={styles.dateTitleMobile_blue}>{yearBlue}</span>
        <span className={styles.dateTitleMobile_pink}>{yearPink}</span>
      </div>
      <div className={styles.circleWrapper}>
        <div ref={circleRef} className={styles.circle}>
          <div ref={dateTitleRef} className={styles.dateTitle}>
            <span className={styles.dateTitle_blue}>{yearBlue}</span>
            <span className={styles.dateTitle_pink}>{yearPink}</span>
          </div>
          {DATE_SLIDES.map((slide, index) => {
            const angle = ((index - 1) * anglePerSlide * Math.PI) / 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = currentSlide === index;

            return (
              <div
                key={slide.id}
                onClick={() => handleDotClick(index)}
                ref={el => (pointsRef.current[index] = el)}
                className={classNames(styles.circle_point, {
                  [styles.circle_point_active]: isActive,
                })}
                style={{
                  top: `calc(49.5% + ${y}px)`,
                  left: `calc(49.5% + ${x}px)`,
                }}
              >
                <div className={styles.circle_activePoint}>
                  <span className={styles.circle_category}>{slide.category}</span>
                  <span className={styles.circle_number}>{slide.id + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.xLine} />
      <div className={styles.yLine} />
      <div className={styles.navContainer}>
        <span className={styles.slidesNumber}>
          {`${currentSlide + 1}`.padStart(2, '0')}/{`${DATE_SLIDES.length}`.padStart(2, '0')}
        </span>
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
      </div>
      <Swiper
        modules={[EffectFade, Pagination, Navigation]}
        effect={'fade'}
        spaceBetween={30}
        allowTouchMove={false}
        pagination={{
          clickable: true,
        }}
        fadeEffect={{ crossFade: true }}
        className={styles.dateSlider}
        onSlideChange={(swiper: any) => handleSlideChange(swiper.activeIndex)}
        onSwiper={(swiperInstance: any) => (swiperRef.current = swiperInstance)}
      >
        {DATE_SLIDES.map(slide => (
          <SwiperSlide key={slide.id}>
            <EventsSlider events={slide.events} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
