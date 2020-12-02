import actions from './actions';
import products from '../../demoData/cart.json';
import { arSA } from 'date-fns/locale';

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
} = actions;

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
const cartAdd = (product, cartData) => {
  //TUT
  let flag = false;
  let duplicate = {};
  cartData.map((item) => {
    if (item.id === product.id) {
      flag = true;
      duplicate = item;
    }
  });

  if (flag) {
    console.log(product);
    return cartUpdateQuantity(product.id, duplicate.quantity ? duplicate.quantity + 1 : 2, cartData);
  } else {
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

export { cartGetData, cartUpdateQuantity, cartDelete, cartAdd };
