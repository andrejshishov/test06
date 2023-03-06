
import { requestTickets } from '../services/services';



export const setError = (error) => {
  return {
    type: 'ERROR',
    error,
  };
};

export const transferFilterClick = (flags) => {
  return {
    type: 'TRANSFER_FILTER',
    flags,
  };
};

export const tabActiveClick = (id) => {
  return {
    type: 'TAB_ACTIVE',
    id,
  };
};

export const setShowSpiner = (flag) => {
  return {
    type: 'SHOW_SPINER',
    flag,
  };
};

export const setTickets = (tickets) => {
  return {
    type: 'TICKETS',
    tickets,
  };
};

export const setEndTicketShow = (end) => {
  return {
    type: 'END_TICKET_SHOW',
    end,
  };
};

export const setFlagButton = (flag) => {
  return {
    type: 'FLAG_BUTTON',
    flag,
  };
};

export const getTickets = (searchId) => {
  return (dispatch, getState) => {
    return getPartTickets(searchId, dispatch, getState);
  };
};


async function getPartTickets(id, dispatch, getState) {
  dispatch(setError(null));
  dispatch(setShowSpiner(true));

  let countError = 0;
  let stop = false;

  while (!stop) {
    
    await requestTickets(id).then(
      (data) => {
        if (!data.tickets) {
          data.tickets = [];
        }
        dispatch(setTickets(data.tickets));
        if (getState().endTicketShow === null) {
          dispatch(tabActiveClick(1));
          dispatch(setEndTicketShow(5));
        }
        stop = data.stop;
        countError = 0;
      },
      (error) => {
        countError++;
        if (countError > 2) {
        
          dispatch(setError(error));
          stop = true;
        }
      }
    );
  } 
  dispatch(setShowSpiner(false));
}