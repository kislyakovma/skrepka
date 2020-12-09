import Cookies from 'js-cookie';
import actions from './actions';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR, LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR, SET_USER } = actions;

const initState = {
  login: localStorage.getItem('logedIn'),
  loading: false,
  error: null,
  failedLogin: true,

  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
};

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        failedLogin: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
        loading: false,
        failedLogin: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
        failedLogin: true,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: false,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: data,
      };
    default:
      return state;
  }
};
export default AuthReducer;
