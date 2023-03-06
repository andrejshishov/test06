import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reduser from './reducer';

const store = createStore(reduser, applyMiddleware(thunk));

export default store;