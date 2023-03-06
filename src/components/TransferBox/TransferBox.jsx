import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions';
import { transferFilterItems } from '../../vars';

import styles from './TransferBox.module.scss';

const TransferBox = () => {
  const transferFilter = useSelector((state) => state.transferFilter);
  const dispatch = useDispatch();

  const flags = [...transferFilter];

  
  const transferClick = (event) => {
    flags[event.target.id] = event.target.checked;

    if (event.target.id === '0') {
      for (let i = 1; i < transferFilter.length; i++) {
        flags[i] = event.target.checked;
      }
    } else if (!event.target.checked) {
      flags[0] = false;
    } else {
      flags[0] = !flags.slice(1).some((item) => item === !event.target.checked);
    }
    dispatch(actions.transferFilterClick(flags));
  };

  const items = transferFilterItems.titles.map((item, ind) => {
    return (
      <label key={ind}>
        <input type="checkbox" id={ind} onChange={transferClick} checked={transferFilter[ind]} />
        <div></div>
        <span>{item}</span>
      </label>
    );
  });

  return (
    <div className={['box', styles['count-transfer']].join(' ')}>
      <div className={styles['count-transfer-title']}>
        <span>Количество пересадок</span>
      </div>
      {items}
    </div>
  );
};

export default TransferBox;