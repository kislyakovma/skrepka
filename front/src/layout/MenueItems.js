import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  if (user.role === 'admin') {
    return (
      <Menu
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      >
        <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Главная">
          {/* <Menu.Item key="home">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Social Media
        </NavLink>
      </Menu.Item> */}
          <Menu.Item key="business">
            {
              <NavLink onClick={toggleCollapsed} to={`${path}/business`}>
                Финансы
              </NavLink>
            }
          </Menu.Item>
          {/* <Menu.Item key="performance">
        <NavLink onClick={toggleCollapsed} to={`${path}/performance`}>
          Site Performance
        </NavLink>}

      </Menu.Item>
          */}
        </SubMenu>
        <SubMenu key="firestore" icon={!topMenu && <FeatherIcon icon="database" />} title="Данные">
          <Menu.Item key="fbView">
            <NavLink onClick={toggleCollapsed} to={`${path}/firestore/fbView`}>
              Пользователи
            </NavLink>
          </Menu.Item>
          <Menu.Item key="fbAdd">
            <NavLink onClick={toggleCollapsed} to={`${path}/firestore/fbAdd`}>
              Новый пользователь
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="ecommerce" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="Товары">
          <Menu.Item key="add-product">
            <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/add-product`}>
              Добавить продукт
            </NavLink>
          </Menu.Item>

          <Menu.Item key="ecommerce">
            <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/products`}>
              Магазин
            </NavLink>
          </Menu.Item>

          <Menu.Item key="orders">
            <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
              Заказы
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="15">Credit Card</Menu.Item> */}
          {/* <Menu.Item key="sellers">
            <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/sellers`}>
              Sellers
            </NavLink>
          </Menu.Item>
          <Menu.Item key="Invoice">
            <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/Invoice`}>
              Счета
            </NavLink>
          </Menu.Item> */}
        </SubMenu>
      </Menu>
    );
  } else {
    return (
      <Menu
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      >
        <Menu.Item
          key="ecommerce"
          icon={
            !topMenu && (
              <FeatherIcon
                onClick={() => {
                  history.push(`${path}/ecommerce/products`);
                }}
                icon="shopping-cart"
              />
            )
          }
        >
          {' '}
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/products`}>
            Магазин
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="orders"
          icon={
            !topMenu && (
              <FeatherIcon
                onClick={() => {
                  history.push(`${path}/ecommerce/orders`);
                }}
                icon="package"
              />
            )
          }
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
            Заказы
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="subscriptions"
          icon={
            !topMenu && (
              <FeatherIcon
                onClick={() => {
                  history.push(`${path}/pages/comingSoon`);
                }}
                icon="at-sign"
              />
            )
          }
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/comingSoon`}>
            Подписки
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
