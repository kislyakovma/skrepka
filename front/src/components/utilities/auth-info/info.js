import React, { useState } from 'react';
import { Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';

import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';

const AuthInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.data.length);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={user.url} alt="" width="70" height="70" style={{ borderRadius: '50%' }} />
          <figcaption>
            <Heading as="h5">{user.name}</Heading>
            <p>{user.position}</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/admin/settings">
              <FeatherIcon icon="user" /> Профиль
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Настройки
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Выйти
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = (value) => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        <img src={require('../../../static/img/flag/english.png')} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        <img src={require('../../../static/img/flag/germany.png')} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        <img src={require('../../../static/img/flag/spain.png')} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        <img src={require('../../../static/img/flag/turky.png')} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      {/* <Popover placement="bottomRight" content={userContent} action="hover"> */}
      {user.role === 'admin' ? (
        <> </>
      ) : (
        <>
          <div className="notification">
            {' '}
            <Link to="/admin/ecommerce/cart" className="head-example">
              <FeatherIcon icon="heart" size={20} />
            </Link>
            {/* </Popover> */}
          </div>
          <div className="notification">
            {/* <Popover placement="bottomRight" content={userContent} action="hover"> */}
            <Badge count={cartCount} dot>
              <Link to="/admin/ecommerce/cart" className="head-example">
                <FeatherIcon icon="shopping-bag" size={20} />
              </Link>
            </Badge>
            {/* </Popover> */}
          </div>
        </>
      )}

      <Notification />

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src={user.url} />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
