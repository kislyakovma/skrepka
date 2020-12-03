import actions from './actions';
import Cookies from 'js-cookie';
import firebase from '../../config/database/firebase';
import products from '../../demoData/cart.json';
import { arSA } from 'date-fns/locale';

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
  console.log('REMEMBER!!!!!');
  if(cookies !== {}){
 return async dispatch =>{
    try{
    dispatch(cartDataBegin());
    dispatch(cartRemember(cookies))
    } catch (err) {
      dispatch(cartDataErr(err));
    }
  }
  }else {
    db.collection('users')
    .doc(email)
    .get()
    .then(doc => {
      if(doc.exists){
        return async dispatch =>{
          try{
          dispatch(cartDataBegin());
          dispatch(cartRemember(doc.data().cart))
          } catch (err) {
            dispatch(cartDataErr(err));
          }
        }
      }
    })
    
  }
 

}

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



  let flag = false;
  let duplicate = {};
  cartData.map((item) => {
    if (item.id === product.id) {
      flag = true;
      duplicate = item;
    }
  });

  if (flag) {
    console.log(duplicate);
    return async dispatch => { 
    cartUpdateQuantity(product.id, duplicate.quantity ? duplicate.quantity + 1 : 2, cartData);
    }
  } else {
    cartData.push(product)
    db.collection('users')
    .doc(email)
    .set({cart: cartData})
    .then(() => {
      Cookies.set('cart', JSON.stringify(cartData));
    })
    return async (dispatch) => {
      dispatch(cartAddProduct(product));
    };
  }
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
