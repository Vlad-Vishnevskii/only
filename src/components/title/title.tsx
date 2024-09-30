import React from 'react';
import styles from './style.module.scss';

type Props = {
  titleText: string;
};

export const Title: React.FC<Props> = ({ titleText }) => {
  return (
    <div className={styles.title}>
      <h1>{titleText}</h1>
      <div className={styles.title_line} />
    </div>
  );
};
