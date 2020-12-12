import actions from './actions';
const initialState = [];
import firebase from '../../config/database/firebase';
import { rememberCart } from '../cart/actionCreator';

const {pullTemplate, pushTemplate} = actions;

const db = firebase.firestore();


const pullTemplates = email => {
  return async (dispatch) => {
    dispatch(pullTemplate(data))
  };
};

const pushTemplates = (data, email) => {
    return async (dispatch) => {
      try{
        db.collection('users')
        .doc(email)
        .update({templates: firebase.firestore.FieldValue.arrayUnion(data) })
        .then(() => {
          dispatch(pushTemplate(data))
        })
     
      }catch(err){
        console.log(err);
      }
    };
  };

export { pushTemplates, pullTemplates };
