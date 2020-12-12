import actions from './actions';
import firebase from '../../config/database/firebase';

const { pullTemplate, pushTemplate, templatesBegin } = actions;

const db = firebase.firestore();

const pullTemplates = (email) => {
  return async (dispatch) => {
    dispatch(templatesBegin());
    db.collection('users')
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.data().templates) {
          dispatch(pullTemplate(doc.data().templates));
        } else {
          dispatch(pullTemplate([]));
        }
      });
  };
};

const pushTemplates = (data, email) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(templatesBegin());
    try {
      db.collection('users')
        .doc(email)
        .update({ templates: firebase.firestore.FieldValue.arrayUnion(data) })
        .then(() => {
          dispatch(pushTemplate(data));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { pushTemplates, pullTemplates };
