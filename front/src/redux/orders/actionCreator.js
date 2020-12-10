import actions from './actions';
const initialState = [];
import firebase from '../../config/database/firebase';
import { rememberCart } from '../cart/actionCreator';

const db = firebase.firestore();

const { filterOrderBegin, filterOrderSuccess, filterOrderErr } = actions;
//Экшн для запроса в бд
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

const orderAddData = (email) => {
  return async (dispatch) => {
    try {
      dispatch(filterOrderBegin());
      console.log('Я В БД');
      db.collection('users')
        .doc(email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            try {
              if (doc.data().orders) {
                dispatch(filterOrderSuccess(doc.data().orders));
              } else {
                dispatch(filterOrderSuccess([]));
              }
            } catch (err) {
              dispatch(filterOrderErr(err));
            }
          } else {
            dispatch(filterOrderErr(err));
          }
        });
    } catch (err) {
      dispatch(filterOrderErr(err));
    }
  };
};

export { orderFilter, orderAddData };
