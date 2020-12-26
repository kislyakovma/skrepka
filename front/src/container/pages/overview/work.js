import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Form, Input, Table, Row, Select, Spin, Upload, notification, AutoComplete, Empty } from 'antd';
import { BasicFormWrapper, Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { companyPull } from '../../../redux/company/actionCreator';

const Work = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { isLoading, user, companies } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      user: state.auth.user,
      companies: state.company.data,
    };
  });

  const [state, setState] = useState({
    values: '',
    inn: '',
    address: '',
    companies: '',
    kpp: '',
    bik: '',
    rs: '',
    bank: '',
    visible: false,
  });

  const handleSubmit = values => {
    setState({ ...state, values });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      address: state.address,
      companies: state.companies,
      kpp: state.kpp,
      inn: state.inn,
    });
  }, [state.address]);

  useEffect(() => {
    // dispatch(companyPull());
    console.log(companies);
  }, []);

  const getCompany = query => {
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
    const token = '6fcdc1c4c6caa6c32fb55b731b2bae0816c9f188';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ query }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(result => setState({ ...state, searchSuggest: result.suggestions }))

      .catch(error => console.log('error', error));
  };

  const columns = [
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'ИНН',
      dataIndex: 'inn',
      key: 'inn',
    },

    {
      title: 'Действия',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <Main>
      <Row gutter={15}>
        <Col className="w-100" md={24}>
          <Cards headless>
            <div>
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  dataSource={[]}
                  columns={columns}
                  pagination={false}
                  locale={{ emptyText: <Empty description={false} /> }}
                  loading={isLoading}
                />
              </TableWrapper>
            </div>
          </Cards>
        </Col>
      </Row>
      <Modal visible={state.visible}>
        <Row justify="center">
          <Col xl={10} md={16} xs={24}>
            <div className="user-work-form">
              <BasicFormWrapper>
                <Form
                  className="add-record-form"
                  style={{ width: '100%' }}
                  layout="vertical"
                  form={form}
                  name="edit"
                  onFinish={handleSubmit}
                >
                  <Form.Item name="inn" label="ИНН">
                    <AutoComplete
                      options={state.searchSuggest}
                      allowClear
                      filterOption={false}
                      notFoundContent={<p>Введите ИНН</p>}
                      placeholder="ИНН"
                      onSearch={e => {
                        getCompany(e);
                      }}
                      onSelect={(e, option) => {
                        setState({
                          ...state,
                          address: option.data.address.value,
                          companies: e,
                          kpp: option.data.kpp,
                          inn: option.data.inn,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="address" label="Адрес компании">
                    <Input placeholder="Адрес компании" />
                  </Form.Item>
                  <Form.Item name="companies" label="Название компании">
                    <Input placeholder="Название компании" defaultValue={state.companies} />
                  </Form.Item>
                  <Form.Item name="kpp" label="КПП">
                    <Input placeholder="КПП" defaultValue={state.kpp} />
                  </Form.Item>
                  <Form.Item name="bik" label="Бик банка">
                    <Input placeholder="Бик банка" defaultValue={state.bik} />
                  </Form.Item>
                  <Form.Item name="bank" label="Название Банка">
                    <Input placeholder="Название Банка" defaultValue={state.bank} />
                  </Form.Item>
                  <Form.Item name="rs" label="Расчетный счет">
                    <Input placeholder="Расчетный счет" defaultValue={state.rs} />
                  </Form.Item>

                  <div className="record-form-actions text-right">
                    <Button htmlType="submit" type="primary">
                      {isLoading ? 'Загрузка...' : 'Обновить'}
                    </Button>
                  </div>
                </Form>
              </BasicFormWrapper>
            </div>
          </Col>
        </Row>
      </Modal>
    </Main>
  );
};

export default Work;
