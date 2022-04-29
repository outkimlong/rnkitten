import { createStore } from 'redux';
import _reducer from './reducer';
const store = createStore(_reducer);
export default store;