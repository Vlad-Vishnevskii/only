import React from 'react';
import './styles.scss';

type CircleProps = {
  count: number; // Количество точек (от 2 до 6)
  handleSlideTo: (index: number) => void;
};

export const DateCircle: React.FC<CircleProps> = ({ count, handleSlideTo }) => {
  // Ограничиваем количество точек от 2 до 6
  const pointsCount = Math.min(Math.max(count, 2), 6);

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

  return (
    <div className="circle-container">
      {points.map((point, index) => (
        <div
          key={index}
          className="circle-point"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            position: 'absolute',
          }}
          onClick={() => handleSlideTo(point.index)}
        >
          <span className="circle-point_number">{point.index + 1}</span>
        </div>
      ))}
    </div>
  );
};
