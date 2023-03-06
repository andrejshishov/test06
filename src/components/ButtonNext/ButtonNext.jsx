import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions';

import styles from './ButtonNext.module.scss';

const ButtonNext = () => {
  const dispatch = useDispatch();

  const endTicketShow = useSelector((state) => state.endTicketShow);
  const flagButton = useSelector((state) => state.flagButton);

  const onClick = () => {
    if (!flagButton) {
      return;
    }
    dispatch(actions.setEndTicketShow(endTicketShow + 5));
  };

  return (
    <button className={['box', styles['button-next']].join(' ')} onClick={onClick}>
      {flagButton ? 'Показать еще 5 билетов!' : 'Рейсов, подходящих под заданные фильтры, не найдено'}
    </button>
  );
};

export default ButtonNext;