import actions from './actions';
const initialState = [];
import firebase from '../../config/database/firebase';
import { rememberCart } from '../cart/actionCreator';

const db = firebase.firestore();

const { filterOrderBegin, filterOrderSuccess, filterOrderErr } = actions;
//Экшн для запроса в бд
const pullTemplates = (column, value) => {
  return async (dispatch) => {

  };
};

const pushTemplates = (column, value) => {
    return async (dispatch) => {
        
    };
  };

export { pushTemplates, pullTemplates };
