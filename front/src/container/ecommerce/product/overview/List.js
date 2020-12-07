import React, {useEffect, useState} from 'react';
import {Col, Pagination, Row, Spin} from 'antd';
import FeatherIcon from 'feather-icons-react';
import {NavLink} from 'react-router-dom/cjs/react-router-dom.min';
import {useDispatch, useSelector} from 'react-redux';
import Heading from '../../../../components/heading/heading';
import {Button} from '../../../../components/buttons/buttons';
import {PaginationWrapper, ProductCard} from '../../Style';
import {cartAdd} from '../../../../redux/cart/actionCreator';

const List = () => {
  const dispatch = useDispatch();
  const { productsAll, isLoader, cartData, user } = useSelector(state => {
    return {
      productsAll: state.products.data,
      isLoader: state.products.loading,
      cartData: state.cart.data,
      user: state.auth.user
    };
  });
  const sizeOfList = (list, size) => {
    if (list.length % size == 0) {
      return length / size;
    } else {
      return length / size + 1;
    }
  };
  const [state, setState] = useState({
    products: productsAll,
    current: 0,
    pageSize: 0,
  });
  const { products } = state;

  useEffect(() => {
    if (productsAll) {
      setState({
        products: productsAll,
      });
    }
  }, [productsAll]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <Row gutter={15}>
      {isLoader ? (
        <div className="spin">
          <Spin />
        </div>
      ) : products.length ? (
        products.map(({ id, name, rate, price, oldPrice, popular, description, img, modified }) => {
          if (modified) {
            return (
              <Col xs={24} key={id}>
                <ProductCard className="list-view" style={{ marginBottom: 20 }}>
                  <div className="product-list">
                    <Row gutter={15}>
                      <Col xxl={6} xs={6}>
                        <figure>
                          <img style={{ width: '100%' }} src={img} alt="" />
                        </figure>
                      </Col>
                      <Col xxl={12} xs={10}>
                        <div className="product-single-description">
                          <Heading className="product-single-title" as="h5">
                            <NavLink to={`/admin/ecommerce/productDetails/${id}`}>{name}</NavLink>
                          </Heading>
                          <p>{description.substr(0, 200)}</p>
                        </div>
                      </Col>
                      <Col xxl={6} xs={8}>
                        <div className="product-single-info">
                          {/* <Link onClick={() => dispatch(updateWishList(id))} className="btn-heart" to="#">
                            <FeatherIcon
                              icon="heart"
                              size={14}
                              color={popular ? '#FF4D4F' : '#9299B8'}
                              fill={popular ? '#FF4D4F' : 'none'}
                            />
                          </Link> */}
                          <p className="product-single-price">
                            <span className="product-single-price__new">{price}₽</span>
                            {oldPrice && (
                              <>
                                <del> ${oldPrice} </del>
                                <span className="product-single-price__offer"> 60% Off</span>
                              </>
                            )}
                          </p>

                          <div className="product-single-action">
                            {user.role === 'admin' ?  <Button
                              className="btn-cart"
                              size="small"
                              type="white"
                              outlined
                              onClick={() => {
                                dispatch(
                                  cartAdd({ id, name, rate, price, oldPrice, popular, description, img, modified }),
                                );
                              }}
                            >
                              <FeatherIcon icon="clipboard" size={14} />Редактировать
                            </Button>
                             :  <>
                               <Button
                              className="btn-cart"
                              size="small"
                              type="white"
                              outlined  
                              onClick={() => {
                                dispatch(
                                  cartAdd({ id, name, rate, price, oldPrice, popular, description, img, modified },
                                    cartData, user.email),
                                
                                );
                              }}
                            >
                              <FeatherIcon icon="shopping-bag" size={14} />В корзину
                            </Button>
                            <Button size="small" type="primary">
                              О товаре
                            </Button>
                            </>
                            }
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </ProductCard>
              </Col>
            );
          }
        })
      ) : (
        <Col xs={24}>
          <Heading as="h1">К сожалению, товары отсутсвуют 😞</Heading>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        {products.length ? (
          <PaginationWrapper style={{ marginTop: 20 }}>
            <Pagination onChange={onHandleChange} pageSize={10} defaultCurrent={1} total={sizeOfList(products, 10)} />
          </PaginationWrapper>
        ) : null}
      </Col>
    </Row>
  );
};

export default List;
