import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Radio, Table } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Steps } from '../../../components/steps/steps';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../styled';
import { FigureCart, CheckoutWrapper, ProductTable, OrderSummary } from '../Style';
import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';
import firebase from '../../../config/database/firebase';
import { template } from 'leaflet/src/core/Util';

const db = firebase.firestore();

const orderid = require('order-id')('@KHJBAKSJDAjnaskdw@3');

const getPrice = (cartData) => {
  let subtotal = 0;
  
  if (cartData !== null && cartData !== {}) {
    cartData.map((data) => {
      const { quantity, price } = data;
      if (quantity) {
        subtotal += quantity * price;
      } else {
        subtotal += price;
      }
      
    });
    return subtotal;
  }
}

const { Option } = Select;
const CheckOut = ({ onCurrentChange }) => {
  const dispatch = useDispatch();
  const { cartData, rtl, user } = useSelector(state => {
    return {
      cartData: state.cart.data,
      rtl: state.ChangeLayoutMode.rtlData,
      user: state.auth.user,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
    template: {},
    values: {},
    requisites: {},
    templates: [
      {
        name: 'НБКИ - АСЛАНЯН',
        info: {
          phone: '+7(999)999-99-99',
          name: 'Асланян Марианна',
          company: 'НБКИ',
          address: 'Большая Никитская, 24/1 ст5',
          city: 'Москва',
          zip: '125009',
        },
      },
    ], //РАСХАРДКОДИТЬ
    companies: [
      {
        name: 'АО НБКИ',
        img: 'https://www.nbki.ru/local/templates/nbki_usfulinfo/public/images/logo.png',
        requisites: {
          bik: '044525225',
          bank: 'ПАО СБЕРБАНК',
          checkingAcc: '40702810538170107483',
          inn: '7703548386',
          ogrn: '1057746710713',
          kpp: '770301001',
        },
      },
    ],
  });

  const { status, isFinished, current } = state;

  useEffect(() => {
    console.log(state.template.name);
    if (state.template.info) {
      form.setFieldsValue({
        name: state.template.info.name,
        company: state.template.info.company,
        phone: state.template.info.phone,
        street: state.template.info.address,
        city: state.template.info.city,
        zip: state.template.info.zip,
      });
    }
  }, [state.template]);

  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const cartDeleted = id => {
    const confirm = window.confirm('Are you sure to delete this product?');
    if (confirm) dispatch(cartDelete(id, cartData));
  };

  const PlaceOrder = (
    <Button className="btn-proceed" type="secondary" size="large">
      <Link to="#">Place Order</Link>
    </Button>
  );

  const next = () => {
    onCurrentChange(current, PlaceOrder);
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    onCurrentChange(current, PlaceOrder);
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const newOrder = (email, order) => {
    const finalObject = Object.assign(order, { timestamp: Date.now(), status: 'new', amount: getPrice(cartData), orderId: orderid.generate() });
    db.collection('users')
      .doc(email)
      .update({ orders: firebase.firestore.FieldValue.arrayUnion(finalObject) })
      .then(() => {
        console.log('Заказ добавлен');
        setState({
          ...state,
          status: 'finish',
          isFinished: true,
          current: 0
        });
      });
  };

  const done = () => {
    const confirm = window.confirm('Вы подтверждаете заказ?');
    onCurrentChange(current, PlaceOrder);
    if (confirm) {
      newOrder(user.email, { company: state.requisites, info: state.values, cart: cartData });
    }
  };

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const dataSource = [];

  let subtotal = 0;

  if (cartData !== null) {
    cartData.map(data => {
      const { id, img, name, quantity, price, size, color } = data;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      return dataSource.push({
        key: id,
        product: (
          <div className="cart-single">
            <FigureCart>
              <img style={{ width: 80 }} src={img} alt="" />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6">{name}</Heading>
                </div>
              </figcaption>
            </FigureCart>
          </div>
        ),
        price: <span className="cart-single-price">{price}₽</span>,
        quantity: (
          <div className="cart-single-quantity">
            <Button onClick={() => decrementUpdate(id, quantity)} className="btn-dec" type="default">
              <FeatherIcon icon="minus" size={12} />
            </Button>
            {quantity ? quantity : 1}
            <Button onClick={() => incrementUpdate(id, quantity)} className="btn-inc" type="default">
              <FeatherIcon icon="plus" size={12} />
            </Button>
          </div>
        ),
        total: <span className="cart-single-t-price">{quantity ? quantity * price : price}₽</span>,
        action: (
          <div className="table-action">
            <Button
              onClick={() => cartDeleted(id)}
              className="btn-icon"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <CheckoutWrapper>
      <Steps
        isswitch
        current={0}
        status={status}
        steps={[
          {
            title: 'Данные о покупателе',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="shipping-form">
                        <Heading as="h4">Пожалуйста, заполните данные </Heading>
                        <Form.Item name="template" initialValue="" label="Шаблон">
                          <Select
                            style={{ width: '100%' }}
                            placeholder="Выбрать шаблон быстрого заполнения"
                            onSelect={value => {
                              setState({ ...state, template: JSON.parse(value), values: JSON.parse(value) });
                            }}
                          >
                            {state.templates.map(item => {
                              return <Option value={JSON.stringify(item)}>{item.name}</Option>;
                            })}
                          </Select>
                        </Form.Item>
                        <Form
                          form={form}
                          name="address"
                          onChange={values => {
                            setState({ ...state, values });
                          }}
                        >
                          <Form.Item name="name" label="Контактное лицо">
                            <Input placeholder="Фамилия Имя" />
                          </Form.Item>
                          <Form.Item name="company" label={<span>Название организации</span>}>
                            <Input placeholder="Название организации" />
                          </Form.Item>
                          <Form.Item name="phone" label="Номер телефона">
                            <Input placeholder="+7(999)999-99-99" />
                          </Form.Item>

                          <Form.Item name="street" label="Адрес">
                            <Input placeholder="Улица, дом, офис" />
                          </Form.Item>
                          <Form.Item name="street2" label="">
                            <Input placeholder="Примечание к адресу" />
                          </Form.Item>
                          <Form.Item name="city" label="Город">
                            <Input placeholder="Город" />
                          </Form.Item>
                          <Form.Item name="zip" label="Индекс">
                            <Input placeholder="Индекс" />
                          </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Реквизиты',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="payment-method-form">
                        <Heading as="h4">Введите реквизиты компании</Heading>
                        <div className="shipping-selection">
                          <Radio.Group style={{ width: '100%' }}>
                            {/*<div className="shipping-selection__card">*/}
                            {/*  <Radio style={{ width: '100%' }} value="card">*/}
                            {/*    <Cards*/}
                            {/*      headless*/}
                            {/*      bodyStyle={{*/}
                            {/*        backgroundColor: '#F8F9FB',*/}
                            {/*        borderRadius: '20px',*/}
                            {/*        border: '1px solid #F1F2F6',*/}
                            {/*      }}*/}
                            {/*    >*/}
                            {/*      <div className="supported-card d-flex">*/}
                            {/*        <span>Credit/Debit Card</span>*/}
                            {/*        <div className="supported-card_logos">*/}
                            {/*          <img*/}
                            {/*            style={{ width: '50px' }}*/}
                            {/*            src={require('../../../static/img/cards-logo/ms.png')}*/}
                            {/*            alt=""*/}
                            {/*          />*/}
                            {/*          <img*/}
                            {/*            style={{ width: '50px' }}*/}
                            {/*            src={require('../../../static/img/cards-logo/american-express.png')}*/}
                            {/*            alt=""*/}
                            {/*          />*/}
                            {/*          <img*/}
                            {/*            style={{ width: '50px' }}*/}
                            {/*            src={require('../../../static/img/cards-logo/visa.png')}*/}
                            {/*            alt=""*/}
                            {/*          />*/}
                            {/*        </div>*/}
                            {/*      </div>*/}
                            {/*      <Cards headless style={{ marginBottom: 0 }}>*/}
                            {/*        <Form form={form} name="info">*/}
                            {/*          <Form.Item name="number" label="Card Number">*/}
                            {/*            <Input placeholder="6547-8702-6987-2527" />*/}
                            {/*          </Form.Item>*/}
                            {/*          <Form.Item name="name" label="Name on Card">*/}
                            {/*            <Input placeholder="Full name" />*/}
                            {/*          </Form.Item>*/}
                            {/*          <Form.Item name="month" initialValue="" label="Expiration Date">*/}
                            {/*            <Select style={{ width: '100%' }}>*/}
                            {/*              <Option value="">MM</Option>*/}
                            {/*              {month.map((value) => (*/}
                            {/*                <Option key={value} value={value}>*/}
                            {/*                  {value}*/}
                            {/*                </Option>*/}
                            {/*              ))}*/}
                            {/*            </Select>*/}
                            {/*          </Form.Item>*/}
                            {/*          <Form.Item name="year" initialValue="">*/}
                            {/*            <Select style={{ width: '100%' }}>*/}
                            {/*              <Option value="">YY</Option>*/}
                            {/*              <Option value={new Date().getFullYear()}>{new Date().getFullYear()}</Option>*/}
                            {/*              {month.map((value) => (*/}
                            {/*                <Option*/}
                            {/*                  key={value}*/}
                            {/*                  value={parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}*/}
                            {/*                >*/}
                            {/*                  {parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}*/}
                            {/*                </Option>*/}
                            {/*              ))}*/}
                            {/*            </Select>*/}
                            {/*          </Form.Item>*/}
                            {/*          <Form.Item name="cvv" label="CVV">*/}
                            {/*            <div className="cvv-wrap">*/}
                            {/*              <Input style={{ width: '60%' }} placeholder="XXX" />*/}
                            {/*              <Link className="input-leftText" to="#">*/}
                            {/*                What is this?*/}
                            {/*              </Link>*/}
                            {/*            </div>*/}
                            {/*          </Form.Item>*/}
                            {/*        </Form>*/}
                            {/*      </Cards>*/}
                            {/*    </Cards>*/}
                            {/*  </Radio>*/}
                            {/*</div>*/}
                            {state.companies.map(item => {
                              return (
                                <div className="shipping-selection__paypal">
                                  <Radio
                                    value={JSON.stringify(item.requisites)}
                                    style={{ width: '100%' }}
                                    onChange={e => {
                                      console.log(e.target.value);
                                      setState({
                                        ...state,
                                        requisites: JSON.parse(e.target.value),
                                        currentCompany: item.name,
                                      });
                                    }}
                                  >
                                    {item.name}
                                  </Radio>
                                </div>
                              );
                            })}

                            <div className="shipping-selection__cash">
                              <Radio value="cash" style={{ width: '100%' }}>
                                Другие реквизиты
                              </Radio>
                            </div>
                          </Radio.Group>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Проверка заказа',
            content:
              status !== 'finish' ? (
                <BasicFormWrapper style={{ width: '100%' }}>
                  <div className="atbd-review-order" style={{ width: '100%' }}>
                    <Heading as="h4">Проверьте и подтвердите заказ</Heading>
                    <Cards bodyStyle={{ backgroundColor: '#F8F9FB', borderRadius: 10 }} headless>
                      <div className="atbd-review-order__single">
                        <Cards headless>
                          <div className="atbd-review-order__shippingTitle">
                            <Heading as="h5">
                              Доставка
                              <Link to="#">
                                <FeatherIcon icon="edit" />
                                Редактировать
                              </Link>
                            </Heading>
                          </div>
                          <article className="atbd-review-order__shippingInfo">
                            <div className="shipping-info-text">
                              {state.template.info ? (
                                <>
                                  <Heading as="h6">{state.template.info.name}</Heading>
                                  <Heading as="h6">Телефон: {state.template.info.phone}</Heading>
                                  <p>
                                    {state.template.info.address} <br />
                                    {state.template.info.city} <br />
                                    {state.template.info.zip}
                                  </p>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </article>
                        </Cards>
                      </div>
                      <div className="atbd-review-order__single">
                        <Cards headless>
                          <div>
                            <Heading as="h5">Реквизиты для счета</Heading>
                          </div>

                          <div className="method-info">
                            <Heading as="h5">{state.currentCompany}</Heading>
                            <p>Банк: {state.requisites.bank}</p>
                            <p>БИК: {state.requisites.bik}</p>
                            <p>Р/С: {state.requisites.checkingAcc}</p>
                            <p>КПП: {state.requisites.kpp}</p>
                            <p>ИНН: {state.requisites.inn}</p>
                          </div>
                        </Cards>
                      </div>

                      <div className="atbd-review-order__single">
                        <Cards headless>
                          <>
                            <ProductTable>
                              <div className="table-cart table-responsive">
                                <Table pagination={false} dataSource={dataSource} columns={columns} />
                              </div>
                            </ProductTable>

                            <Row justify="end">
                              <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!rtl ? 10 : 0}>
                                <OrderSummary>
                                  <div className="invoice-summary-inner">
                                    <ul className="summary-list">
                                      {/*<li>*/}
                                      {/*  <span className="summary-list-title">Сумма заказа :</span>*/}
                                      {/*  <span className="summary-list-text">{`${subtotal}₽`}</span>*/}
                                      {/*</li>*/}
                                      {/*<li>*/}
                                      {/*  <span className="summary-list-title">Discount :</span>*/}
                                      {/*  <span className="summary-list-text">{`$${-20}`}</span>*/}
                                      {/*</li>*/}
                                      {/*<li>*/}
                                      {/*  <span className="summary-list-title">Доставка :</span>*/}
                                      {/*  <span className="summary-list-text">{`$${30}`}</span>*/}
                                      {/*</li>*/}
                                    </ul>
                                    <Heading className="summary-total" as="h4">
                                      <span className="summary-total-label">Итого : </span>
                                      <span className="summary-total-amount">{`${subtotal}₽`}</span>
                                    </Heading>
                                  </div>
                                </OrderSummary>
                              </Col>
                            </Row>
                          </>
                        </Cards>
                      </div>
                    </Cards>
                  </div>
                </BasicFormWrapper>
              ) : (
                <Row justify="start" style={{ width: '100%' }}>
                  <Col xl={20} xs={24}>
                    <div className="checkout-successful">
                      <Cards
                        headless
                        bodyStyle={{
                          backgroundColor: '#F8F9FB',
                          borderRadius: '20px',
                        }}
                      >
                        <Cards headless>
                          <span className="icon-success">
                            <FeatherIcon icon="check" />
                          </span>
                          <Heading as="h3">Заказ создан</Heading>
                          <p>Спасибо за покупку! Счет выставлен вам на почту.</p>
                        </Cards>
                      </Cards>
                    </div>
                  </Col>
                </Row>
              ),
          },
        ]}
        onNext={next}
        onPrev={prev}
        onDone={done}
        isfinished={isFinished}
      />
    </CheckoutWrapper>
  );
};

export default CheckOut;
