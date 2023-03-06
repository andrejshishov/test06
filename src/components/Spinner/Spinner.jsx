import React from 'react';
import { Spin } from 'antd';

import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spin}>
      <Spin tip="Loading 5 tickets..." />
    </div>
  );
};

export default Spinner;