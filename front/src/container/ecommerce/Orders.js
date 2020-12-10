import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { orderFilter, orderAddData } from '../../redux/orders/actionCreator';

const Orders = () => {
  const dispatch = useDispatch();
  const { searchData, orders, user } = useSelector((state) => {
    return {
      user: state.auth.user,
      searchData: state.headerSearchData,
      orders: state.orders.data,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    item: orders,
    selectedRowKeys: [],
  });

  const { notData, item, selectedRowKeys } = state;
  const filterKey = ['Shipped', 'Awaiting Shipment', 'Canceled'];

  /**
   * @todo purpose
   * @todo ternary issue
   */
  useEffect(() => {
    dispatch(orderAddData(user.email));
    if (orders) {
      setState({
        item: orders,
        selectedRowKeys,
      });
    }
  }, []);

  const handleSearch = (searchText) => {
    const data = searchData.filter((value) => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const handleChangeForFilter = (e) => {
    dispatch(orderFilter('status', e.target.value));
  };

  const dataSource = [];
  if (orders.length) {
    orders.map((value, key) => {
      var date = new Date(value.timestamp);
      date = date.toLocaleString('ru-Ru', { timeZone: 'Europe/Moscow' });
      const { status, orderId, info, cart, amount } = value;
      return dataSource.push({
        id: <span className="order-id">{orderId}</span>,
        customer: <span className="customer-name">{info.info.company}</span>,
        status: (
          <span
            className={`status ${status === 'new' ? 'Success' : status === 'Awaiting Shipment' ? 'warning' : 'error'}`}
          >
            {status === 'new' ? 'Новый' : status === 'Awaiting Shipment' ? 'warning' : 'error'}
          </span>
        ),
        amount: <span className="ordered-amount">{amount}₽</span>,
        date: <span className="ordered-date">{date}</span>,
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="primary" to="#" shape="circle">
                <FeatherIcon icon="eye" size={16} />
              </Button>
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Номер заказа',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Компания',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = (selectedRowKey) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectChange(selectedRowKeys);
    },
  };

  return (
    <>
      <PageHeader ghost title="Ваши заказы" />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Экспортировать
                      </Button>
                    </div>
                  </Col>
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 7, showSizeChanger: true, total: orders.length }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default Orders;
