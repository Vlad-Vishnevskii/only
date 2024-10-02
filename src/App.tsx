import React from 'react';
import { Title, RotatingSlider } from './components';

import styles from './style.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.app_container}>
        <Title titleText="Исторические даты" />
        <RotatingSlider />
      </div>
    </div>
  );
};

export default App;
