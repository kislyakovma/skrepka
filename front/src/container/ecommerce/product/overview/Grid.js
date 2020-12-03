import React, { useState, useEffect } from 'react';
import { Row, Col, Rate, Pagination, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard, PaginationWrapper, NotFoundWrapper } from '../../Style';
import { updateWishList } from '../../../../redux/product/actionCreator';
import { cartAdd } from '../../../../redux/cart/actionCreator';

const Grid = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => {
    return state.cart.data;
  });

  const { productsAll, isLoader } = useSelector((state) => {
    return {
      productsAll: state.products.data,
      isLoader: state.products.loading,
    };
  });
  const user = useSelector((state) => state.auth.user);
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

  const sizeOfList = (list, size) => {
    if (list.length % size == 0) {
      return length / size;
    } else {
      return length / size + 1;
    }
  };

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };
  // @Todo Nested Ternary
  return (
    <Row gutter={30}>
      {isLoader ? (
        <Col xs={24}>
          <div className="spin">
            <Spin />
          </div>
        </Col>
      ) : products.length ? (
        products.map(({ id, name, rate, price, oldPrice, popular, img, modified, description }) => {
          if (modified) {
            return (
              <Col xxl={6} lg={12} xs={24} key={id}>
                <ProductCard style={{ marginBottom: 30 }}>
                  <figure>
                    <img src={img} alt={`img${id}`} />
                  </figure>
                  <figcaption>
                    <Heading className="product-single-title" as="h5">
                      <Link to={`/admin/ecommerce/productDetails/${id}`}>{name}</Link>
                    </Heading>
                    <p className="product-single-price">
                      <span className="product-single-price__new">{price}₽</span>
                      {oldPrice && (
                        <>
                          <del className="product-single-price__old"> ${oldPrice} </del>
                          <span className="product-single-price__offer"> 60% Off</span>
                        </>
                      )}
                    </p>

                    <div className="product-single-action">
                      {user.role === 'admin' ? (
                        <Button
                          size="small"
                          type="white"
                          className="btn-cart"
                          outlined={true}
                          onClick={() => {
                            console.log('миша сосет');
                          }}
                        >
                          <FeatherIcon icon="clipboard" size={14} />
                          Редактировать
                        </Button>
                      ) : (
                        <>
                          {' '}
                          <Button
                            size="small"
                            type="white"
                            className="btn-cart"
                            outlined={true}
                            onClick={() => {
                              dispatch(
                                cartAdd(
                                  { id, name, rate, price, oldPrice, popular, description, img, modified },
                                  cartData, user.email
                                ),
                              );
                            }}
                          >
                            <FeatherIcon icon="shopping-bag" size={14} />В Корзину
                          </Button>
                          <Link to={`/admin/ecommerce/productDetails/${id}`}>
                            <Button size="small" type="primary">
                              О товаре
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </figcaption>
                </ProductCard>
              </Col>
            );
          }
        })
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">К сожалению, товары отсутсвуют 😞</Heading>
          </NotFoundWrapper>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        <PaginationWrapper style={{ marginTop: 10 }}>
          {products.length ? (
            <Pagination onChange={onHandleChange} pageSize={10} defaultCurrent={1} total={sizeOfList(products, 10)} />
          ) : null}
        </PaginationWrapper>
      </Col>
    </Row>
  );
};

export default Grid;
