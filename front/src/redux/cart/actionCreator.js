import actions from './actions';
import Cookies from 'js-cookie';
import firebase from '../../config/database/firebase';
import products from '../../demoData/cart.json';
import { arSA } from 'date-fns/locale';
import { setOptions } from 'leaflet/src/core/Util';

const db = firebase.firestore();

const {
  cartDataBegin,
  cartDataSuccess,
  cartDataErr,

  cartUpdateBegin,
  cartUpdateSuccess,
  cartUpdateErr,

  cartDeleteBegin,
  cartDeleteSuccess,
  cartDeleteErr,
  cartAddProduct,

  cartRemember,
} = actions;

const rememberCart = (email, cookies) => {
  return async (dispatch) => {
    dispatch(cartDataBegin());
    if (cookies.length !== 0) {
      console.log(cookies);
      try {
        dispatch(cartRemember(cookies));
      } catch (err) {
        dispatch(logoutErr(err));
      }
    } else {
      db.collection('users')
        .doc(email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            try {
              if (doc.data().cart) {
                dispatch(cartRemember(doc.data().cart));
              } else {
                dispatch(cartRemember([]));
              }
            } catch (err) {
              dispatch(cartDataErr(err));
            }
          }
        });
    }
  };
};

const cartGetData = () => {
  return async (dispatch) => {
    try {
      dispatch(cartDataBegin());
      dispatch(cartDataSuccess([]));
    } catch (err) {
      dispatch(cartDataErr(err));
    }
  };
};

const cartUpdateQuantity = (id, quantity, cartData) => {
  return async (dispatch) => {
    try {
      dispatch(cartUpdateBegin());
      const data = cartData.map((item) => {
        if (item.id === id) item.quantity = quantity;
        return item;
      });
      dispatch(cartUpdateSuccess(data));
    } catch (err) {
      dispatch(cartUpdateErr(err));
    }
  };
};
const cartAdd = (product, cartData, email) => {
  return async (dispatch) => {
    console.log(product);
    let flag = false;
    let duplicate = {};
    cartData.map((item) => {
      if (item.id === product.id) {
        flag = true;
        duplicate = item;
      }
    });

    if (flag) {
      dispatch(cartUpdateQuantity(product.id, duplicate.quantity ? duplicate.quantity + 1 : 2, cartData));
    } else {
      cartData.push(product);
      console.log(cartData);
      db.collection('users')
        .doc(email)
        .set({ cart: cartData }, { merge: true })
        .then(() => {
          console.log('AUE');
          localStorage.setItem('cart', JSON.stringify(cartData));
          // Cookies.set('cart', JSON.stringify(cartData), { expires: 8 });
          dispatch(rememberCart(email, cartData));
        });
    }
  };
};

const cartDelete = (id, chartData) => {
  return async (dispatch) => {
    try {
      dispatch(cartDeleteBegin());
      const data = chartData.filter((item) => item.id !== id);
      setTimeout(() => {
        dispatch(cartDeleteSuccess(data));
      }, 500);
    } catch (err) {
      dispatch(cartDeleteErr(err));
    }
  };
};

export { cartGetData, rememberCart, cartUpdateQuantity, cartDelete, cartAdd };
