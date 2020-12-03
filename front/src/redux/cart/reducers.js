import actions from './actions';
import Cookies from 'js-cookie';
import firebase from '../../config/database/firebase';





const {
  CART_DATA_BEGIN,
  CART_DATA_SUCCESS,
  CART_DATA_ERR,

  CART_UPDATE_BEGIN,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_ERR,

  CART_DELETE_BEGIN,
  CART_DELETE_SUCCESS,
  CART_DELETE_ERR,
  CART_ADD_PRODUCT,

  CART_REMEMBER
} = actions;

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CART_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CART_DATA_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CART_DATA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CART_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CART_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CART_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CART_DELETE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CART_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CART_ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        data: state.data.concat(data),
      };
    case CART_REMEMBER:
      return {
        ...state,
        loading: false,
        data,
      };
    default:
      return state;
  }
};

export default cartReducer;

// (async function  setBD () {
//   console.log('huuuuuuuuuuuuus');
// const db = firebase.firestore();
// if (JSON.parse(Cookies.get('user'))){
//   var email = JSON.parse(Cookies.get('user')).email;
//   firebase.then(data)
//   const dataRef =  db.collection('users')
//   .doc(email)
//   .then()
//   console.log('huy');
//   if (dataRef.get().data() != undefined){
//     console.log('huy');
//     var dataCart = dataRef.get().data().cart
//     console.log(dataCart);
//   }else{
//     console.log('huy');
//     var dataH ={
//       cart: [
//         {description: '',
//         id: 0,
//         img: '',
//         modified: null,
//         name: "",
//         oldPrice: null,
//         popular: 0,
//         price: 0,
//         quantity: 0,
//         rate: 0}
//       ]
//     }
//      var dataCart = dataH.cart
//      console.log('asdasdasdasd');
//     const res = await dataRef.set(dataH, {capital: true}, { merge: true });
//   }
  
// }

// }())