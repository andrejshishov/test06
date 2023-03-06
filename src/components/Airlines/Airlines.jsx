import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import * as actions from '../../store/actions';

import styles from './Airlines.module.scss';

const Airlines = () => {
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.tickets);
  const endTicketShow = useSelector((state) => state.endTicketShow);
  const tabActive = useSelector((state) => state.tabActive);
  const transferFilter = useSelector((state) => state.transferFilter);

  const [ticketsShow, setTicketsShow] = useState([]);
  let ticketsCopy = useRef(tickets);

  const getTtransferFilter = () => {
   
    let transfers = transferFilter.reduce((res, transfer, index) => {
      if (transfer) {
        res.push(index);
      }
      return res;
    }, []);

    
    return tickets.filter((ticket) => {
      return transfers.some((ind) => ind - 1 === ticket.segments[0].stops.length);
    });
  };

 
  const ticketsSort = (tab) => {
    if (tab === 1) {
      ticketsCopy.current.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (tab === 2) {
      ticketsCopy.current.sort((a, b) => {
        return a.segments[0].duration - b.segments[0].duration;
      });
    } else if (tab === 3) {
      ticketsCopy.current.sort((a, b) => {
        if (a.price < b.price && a.segments[0].duration < b.segments[0].duration) {
          return -1;
        } else if (a.price > b.price && a.segments[0].duration > b.segments[0].duration) {
          return 1;
        }
        return 0;
      });
    }
  };

  useEffect(() => {
    dispatch(actions.setError(null));

    if (tabActive === null) {
      return;
    }

    ticketsCopy.current = getTtransferFilter();
    ticketsSort(Number(tabActive));

    const ticketsArray = ticketsCopy.current.slice(0, endTicketShow);
    setTicketsShow(ticketsArray);
    dispatch(actions.setFlagButton(ticketsArray.length > 0 ? true : false));
  }, [tabActive, transferFilter, tickets]);

  useEffect(() => {
    dispatch(actions.setError(null));
    setTicketsShow(ticketsCopy.current.slice(0, endTicketShow));
  }, [endTicketShow]);


  const getTimePath = (min) => {
    const hours = Math.trunc(min / 60);
    const minuts = min % 60;
    return `${hours}ч ${minuts}м`;
  };

 
  const peresadki = (num) => {
    let col = `${num} `;
    let start = 'пересад';
    let end = 'ки';
    if (num === 1) {
      end = 'ка';
    } else if (num > 4) {
      end = 'ок';
    } else if (num === 0) {
      col = '';
      start = 'прямой';
      end = '';
    }
    return `${col}${start}${end}`;
  };


  const getTimeDate = (date, duration) => {
    const dat = new Date(date).getTime();
    let time = dat + duration * 60 * 1000;
    return `${format(dat, 'H:m')} – ${format(time, 'H:m')}`;
  };

  
  const getPrice = (cena) => {
    let price = String(cena);
    return price.slice(0, price.length - 3) + ' ' + price.slice(price.length - 3);
  };

  return ticketsShow.map((ticket, index) => {
    return (
      <div className={['box', styles.airlines].join(' ')} key={`${ticket.carrier}${index}`}>
        <div className={styles.header}>
          <div className={styles.price}>{getPrice(ticket.price)} р</div>
          <img className={styles.logo} src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} />
        </div>

        <div className={styles.passage}>
          <div className={styles.detail}>
            <span
              className={styles['detail-title']}
            >{`${ticket.segments[0].origin} – ${ticket.segments[0].destination}`}</span>
            <br />
            <span className={styles['detail-content']}>
              {getTimeDate(ticket.segments[0].date, ticket.segments[0].duration)}
            </span>
          </div>
          <div className={styles.detail}>
            <span className={styles['detail-title']}>В пути</span>
            <br />
            <span className={styles['detail-content']}>{getTimePath(ticket.segments[0].duration)}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles['detail-title']}>{peresadki(ticket.segments[0].stops.length)}</span>
            <br />
            <span className={styles['detail-content']}>{ticket.segments[0].stops.join(' ')}</span>
          </div>
        </div>

        <div className={styles.passage}>
          <div className={styles.detail}>
            <span
              className={styles['detail-title']}
            >{`${ticket.segments[1].origin} – ${ticket.segments[1].destination}`}</span>
            <br />
            <span className={styles['detail-content']}>
              {getTimeDate(ticket.segments[1].date, ticket.segments[1].duration)}
            </span>
          </div>
          <div className={styles.detail}>
            <span className={styles['detail-title']}>В пути</span>
            <br />
            <span className={styles['detail-content']}>{getTimePath(ticket.segments[1].duration)}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles['detail-title']}>{peresadki(ticket.segments[1].stops.length)}</span>
            <br />
            <span className={styles['detail-content']}>{ticket.segments[1].stops.join(' ')}</span>
          </div>
        </div>
      </div>
    );
  });
};


export default Airlines;