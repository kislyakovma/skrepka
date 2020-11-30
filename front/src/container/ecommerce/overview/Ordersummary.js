import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OrderSummary } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { cartGetData } from '../../../redux/cart/actionCreator';

const Ordersummary = ({  isExact, path, cartData }) => {
  const dispatch = useDispatch();
  const { rtl } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });
  let subtotal = 0;
  if (cartData !== null) {
    console.log(cartData);
    cartData.map(data => {
      const { quantity, price } = data;
      console.log(quantity);
      console.log(price);
      subtotal += quantity * price;
      // return subtotal;
    });
  }

  const submitPromo = values => {
    setState({ ...state, promo: values });
  };

  const { Option } = Select;

  const onSubmit = () => {
    document.querySelectorAll('button span').forEach(item => {
      if (item.innerHTML === 'Done') {
        item.click();
      }
    });
  };

  return (
    <Cards
      bodyStyle={{
        backgroundColor: '#F8F9FB',
        borderRadius: '20px',
      }}
      headless
    >
      <OrderSummary>
        <Heading className="summary-table-title" as="h4">
          Ваша корзина
        </Heading>
        <Cards
          bodyStyle={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
          }}
          headless
        >
          <div className="order-summary-inner">
            <ul className="summary-list">
              <li>
                <span className="summary-list-title">Товары :</span>
                <span className="summary-list-text">{`${subtotal}₽`}</span>
              </li>
              <li>
                <span className="summary-list-title">Скидка :</span>
                <span className="summary-list-text">{`0₽`}</span>
              </li>
              <li>
                <span className="summary-list-title">Доставка :</span>
                <span className="summary-list-text">{`${0}₽`}</span>
              </li>
            </ul>
            <Form form={form} name="promo" onFinish={submitPromo}>
              <div className="promo-apply-form">
                <Form.Item name="promoCode" label="Введите промокод">
                  <Input style={{ width: '72%' }} placeholder="Промокод" />
                  <Button htmlType="submit" size="default" type="success" outlined>
                    Применить
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <Heading className="summary-total" as="h4">
              <span className="summary-total-label">Итого : </span>
              <span className="summary-total-amount">{`${subtotal}₽`}</span>
            </Heading>
            {isExact && (
              <Button className="btn-proceed" type="secondary" size="large">
                <Link to={`${path}/checkout`}>
                  Подтверждение заказа
                  <FeatherIcon icon={!rtl ? 'arrow-right' : 'arrow-left'} size={14} />
                </Link>
              </Button>
            )}
            {state.current === 3 && (
              <Button onClick={onSubmit} className="btn-proceed" type="secondary" size="large">
                <Link to="#">Подтверидть</Link>
              </Button>
            )}
          </div>
        </Cards>
      </OrderSummary>
    </Cards>
  );
};

export default Ordersummary;
