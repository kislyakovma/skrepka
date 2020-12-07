import React, {useState} from 'react';
import {Form, Input, Spin, Table} from 'antd';
import FeatherIcon from 'feather-icons-react';
import {useDispatch, useSelector} from 'react-redux';
import {FigureCart, ProductTable} from '../Style';
import Heading from '../../../components/heading/heading';
import {Button} from '../../../components/buttons/buttons';
import {cartDelete, cartUpdateQuantity} from '../../../redux/cart/actionCreator';

const CartTable = () => {
  const dispatch = useDispatch();
  const { cartData, isLoading, user } = useSelector((state) => {
    return {
      cartData: state.cart.data,
      isLoading: state.cart.loading,
      rtl: state.ChangeLayoutMode.rtlData,
      user: state.auth.user,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
    currentQuantity: null,
  });
  // useEffect(()=>{}, [state.currentQuantity])
  const quantityUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10);
    dispatch(cartUpdateQuantity(id, data, cartData, user.email));
  };
  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    dispatch(cartUpdateQuantity(id, data, cartData, user.email));
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    dispatch(cartUpdateQuantity(id, data, cartData, user.email));
  };

  const cartDeleted = (id) => {
    const confirm = window.confirm('Уверены что хотите удалить товар из корзианы?');
    if (confirm) dispatch(cartDelete(id, cartData, user.email));
  };

  const productTableData = [];

  if (cartData !== null && cartData !== {}) {
    cartData.map((data) => {
      const { id, img, name, quantity, price, size, color } = data;
      if (data.quantity === undefined) {
        data.quantity = 1;
      }
      return productTableData.push({
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
            <Input
              onChange={(e) => {
                if (e.target.value.length > 4) {
                  return;
                }
                if (e.target.value !== '') {
                  quantityUpdate(id, parseInt(e.target.value));
                } else {
                  quantityUpdate(id, 0);
                }
              }}
              value={quantity != 0 ? quantity : ''}
              className="btn-inc"
              style={{ padding: 20, marginLeft: '0', minWidth: '65px', textAlign: 'center', fontSize: 15 }}
              bordered={false}
            />
            <Button onClick={() => incrementUpdate(id, quantity)} className="btn-inc" type="default">
              <FeatherIcon icon="plus" size={12} />
            </Button>
          </div>
        ),
        total: <span className="cart-single-t-price">{quantity * price}₽</span>,
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

  const productTableColumns = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Сумма',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const submitCoupon = (values) => {
    setState({ ...state, coupon: values });
  };

  return (
    <>
      <ProductTable>
        {isLoading ? (
          <div className="sd-spin">
            <Spin />
          </div>
        ) : (
          <div className="table-cart table-responsive">
            <Table
              pagination={false}
              dataSource={productTableData}
              columns={productTableColumns}
              locale={{ emptyText: 'Здесь пока пусто' }}
            />
          </div>
        )}
      </ProductTable>
    </>
  );
};

export default CartTable;
