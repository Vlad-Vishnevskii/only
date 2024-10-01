import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

import './styles.scss';

type CircleProps = {
  count: number; // Количество точек (от 2 до 6)
  handleSlideTo: (index: number) => void;
  activeSlideId: number;
};

export const DateCircle: React.FC<CircleProps> = ({ count, handleSlideTo, activeSlideId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ограничиваем количество точек от 2 до 6
  const pointsCount = Math.min(Math.max(count, 2), 6);
  const [offset, setOffsect] = useState(0);
  const angleRef = useRef<number>(0);

  // Параметры окружности
  const radius = 199; // Радиус окружности
  const centerX = 200; // X координата центра окружности
  const centerY = 200; // Y координата центра окружности

  // Генерация точек на окружности
  const points = Array.from({ length: pointsCount }).map((_, index) => {
    const angle = (2 * Math.PI * index) / pointsCount; // Угол для каждой точки
    const x = centerX + radius * Math.cos(angle); // X координата точки
    const y = centerY + radius * Math.sin(angle); // Y координата точки
    return { index, x, y };
  });

  const slideTo = (index: number) => {
    angleRef.current += 90;
    setOffsect(prev => prev + 90);
    if (containerRef.current) {
      gsap.to(containerRef.current, { rotation: angleRef.current, duration: 1 });
    }
    handleSlideTo(index);
  };

  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current.style.rotate);
      gsap.to(containerRef.current, { rotation: '-=180', duration: 1 });
      setOffsect(prev => prev + 180);
    }
  }, [activeSlideId]);

  return (
    <div ref={containerRef} className="circle-container">
      {points.map((point, index) => (
        <div
          key={index}
          className="circle-point"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            position: 'absolute',
          }}
          onClick={() => slideTo(point.index)}
        >
          <span
            style={{
              transform: `rotate(${-offset}deg)`,
            }}
            className="circle-point_number"
          >
            {point.index + 1}
          </span>
        </div>
      ))}
    </div>
  );
};
