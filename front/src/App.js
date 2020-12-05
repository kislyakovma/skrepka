import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import store, { rrfProps } from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { rememberCart } from './redux/cart/actionCreator';
import Cookies from 'js-cookie';
import { tinkoffApi } from './config/api/index';

const { theme } = config;

const ProviderConfig = () => {
  const dispatch = useDispatch();
  const { rtl, isLoggedIn, topMenu, user } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
      user: state.auth.user,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    if (user.email) {
      if (localStorage.getItem('cart')) {
        console.log(JSON.parse(localStorage.getItem('cart')));
        dispatch(rememberCart(user.email, JSON.parse(localStorage.getItem('cart'))));
      } else {
        console.log('AHUET');
        dispatch(rememberCart(user.email, []));
      }
    }
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  useEffect(() => {}, []);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu }}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router basename={process.env.PUBLIC_URL}>
            {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
            {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
              <Redirect to="/admin" />
            )}
          </Router>
        </ReactReduxFirebaseProvider>
        <ToastContainer />
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
