import actions from './actions';
import initialState from '../../demoData/orders.json';
import firebase from '../../config/database/firebase';
import { rememberCart } from '../cart/actionCreator';

const db = firebase.firestore();

const { filterOrderBegin, filterOrderSuccess, filterOrderErr } = actions;

const orderFilter = (column, value) => {
  return async (dispatch) => {
    try {
      dispatch(filterOrderBegin());

      const data = initialState.filter((item) => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterOrderSuccess(data));
    } catch (err) {
      dispatch(filterOrderErr(err));
    }
  };
};

export { orderFilter };
