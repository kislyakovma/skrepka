import actions from './actions';
import firebase from '../../config/database/firebase';

const { pullCompany, pushCompany, companyBegin } = actions;

const db = firebase.firestore();

const companyPull = email => {
  return async dispatch => {
    dispatch(companyBegin());
    db.collection('users')
      .doc(email)
      .get()
      .then(doc => {
        if (doc.data().companies) {
          dispatch(pullCompany(doc.data().companies));
        } else {
          dispatch(pullCompany([]));
        }
      });
  };
};

const companyPush = (data, email) => {
  return async dispatch => {
    dispatch(companyBegin());
    try {
      db.collection('users')
        .doc(email)
        .update({ companies: firebase.firestore.FieldValue.arrayUnion(data) })
        .then(() => {
          dispatch(pushCompany(data));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { companyPull, companyPush };
