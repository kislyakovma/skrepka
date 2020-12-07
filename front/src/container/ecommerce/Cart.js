import React, {lazy, Suspense, useState} from 'react';
import {Col, Row, Skeleton} from 'antd';
import FeatherIcon from 'feather-icons-react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PageHeader} from '../../components/page-headers/page-headers';
import {Main} from '../styled';
import {Cards} from '../../components/cards/frame/cards-frame';
import {Button} from '../../components/buttons/buttons';
import {cartDeleteAll} from '../../redux/cart/actionCreator';

const Checkout = lazy(() => import('./overview/CheckOut'));
const CartTable = lazy(() => import('./overview/CartTable'));
const Ordersummary = lazy(() => import('./overview/Ordersummary'));

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => {
    return state.cart.data;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const { path, isExact } = useRouteMatch();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });

  const onCartDelete = () => {
    dispatch(cartDeleteAll(user.email));
  };

  const onHandleCurrent = (current) => {
    setState({
      ...state,
      current,
    });
  };

  return (
    <>
      <PageHeader
        ghost
        title="Корзина"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              size="small"
              key="4"
              type="primary"
              onClick={() => {
                console.log('NASVAY');
                onCartDelete();
              }}
            >
              <FeatherIcon icon="trash" size={14} />
              Очистить корзину
            </Button>
          </div>,
        ]}
      />
      <Main>
        <div className={isExact ? 'cartWraper' : 'checkoutWraper'}>
          <Row gutter={15}>
            <Col md={24}>
              <Cards headless>
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <Switch>
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton paragraph={{ rows: 10 }} active />
                          </Cards>
                        }
                      >
                        <Route
                          path={`${path}/checkout`}
                          render={() => <Checkout onCurrentChange={onHandleCurrent} />}
                        />
                        <Route exact path={path} component={CartTable} />
                      </Suspense>
                    </Switch>
                  </Col>
                  <Col xxl={7} xs={24}>
                    <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      <Ordersummary isExact={isExact} path={path} cartData={cartData} />
                    </Suspense>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
        </div>
      </Main>
    </>
  );
};

export default ShoppingCart;
