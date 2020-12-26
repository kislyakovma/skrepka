import actions from './actions';
import firebase from '../../config/database/firebase';

const db = firebase.firestore();

const getData = async () => {
  const arr = [];
  const snapshot = await db.collection('products').get();
  snapshot.docs.map((doc) => {
    arr.push(doc.data());
  });
  return arr;
};

const { searchHeaderBegin, searchHeaderSuccess, searchHeaderErr } = actions;

const headerSearchAction = (searchData) => {
  return async (dispatch) => {
    try {
      getData((products) => {
        dispatch(searchHeaderBegin());
        const data = products.filter((item) => {
          return item.name.startsWith(searchData);
        });
        dispatch(searchHeaderSuccess(data));
      });
    } catch (err) {
      dispatch(searchHeaderErr(err));
    }
  };
};

export { headerSearchAction };
