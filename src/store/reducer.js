import { transferFilterItems } from '../vars';


const reduser = (
  state = {
    transferFilter: transferFilterItems.flags,
    tabActive: null,
    showSpiner: false,
    tickets: [],
    endTicketShow: null,
    error: null,
    flagButton: true,
  },
  action
) => {
  switch (action.type) {
  case 'TRANSFER_FILTER':
    return { ...state, transferFilter: action.flags };

  case 'TAB_ACTIVE':
    return { ...state, tabActive: action.id };

  case 'SHOW_SPINER':
    return { ...state, showSpiner: action.flag };

  case 'TICKETS':
    return { ...state, tickets: [...state.tickets, ...action.tickets] };

  case 'END_TICKET_SHOW':
    return { ...state, endTicketShow: action.end };

  case 'ERROR':
    return { ...state, error: action.error };
    
  case 'FLAG_BUTTON':
    return { ...state, flagButton: action.flag };

  default:
    return state;
  }
};

export default reduser;