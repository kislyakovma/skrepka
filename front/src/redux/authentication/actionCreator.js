import Cookies from 'js-cookie';
import actions from './actions';
import firebase from '../../config/database/firebase';

const db = firebase.firestore();

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, setUser } = actions;

const login = (email, password, remember) => {
  return async (dispatch) => {
    dispatch(loginBegin());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // eslint-disable-next-line consistent-return
      .then((data) => {
        if (data) {
          localStorage.setItem('logedIn', true);
          db.collection('users')
            .doc(email)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                if (remember) {
                  localStorage.setItem('user', JSON.stringify(doc.data()));
                }
                dispatch(setUser(doc.data()));
                dispatch(loginSuccess(true));
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
                dispatch(setUser({ name: 'undefined' }));
              }
            })
            .catch(function (error) {
              console.log('Error getting document:', error);
            });
        }
      })
      .catch((err) => {
        dispatch(loginErr(err));
      });
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
