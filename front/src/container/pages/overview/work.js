import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Form, Input, Table, Row, Select, Spin, Upload, notification, AutoComplete, Empty } from 'antd';
import { BasicFormWrapper, Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { companyPull } from '../../../redux/company/actionCreator';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

const Work = ({ match }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { isLoading, user, companies, isTableLoading } = useSelector((state) => {
    return {
      isLoading: state.crud.loading,
      isTableLoading: state.company.loading,
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
    userEmale: match.params.id,
  });

  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const handleOk = () => {
    setState({ ...state, visible: false });
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
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
    dispatch(companyPull(state.userEmale));
    console.log(match);
    console.log(companies);
  }, []);

  const getCompany = (query) => {
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
      .then((response) => response.json())
      .then((result) => setState({ ...state, searchSuggest: result.suggestions }))

      .catch((error) => console.log('error', error));
  };

  const columns = [
    {
      title: 'Компания',
      dataIndex: 'name',
      key: 'name',
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

  const dataSource = [];

  if (companies.length) {
    companies.map((company, key) => {
      return dataSource.push({
        key: key + 1,
        name: company.value,
        inn: company.inn,
        action: (
          <div className="table-actions">
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
      });
    });
  }

  return (
    <>
      <Row gutter={15}>
        <Col className="w-100" md={24}>
          <Cards headless>
            <div>
              <TableWrapper className="table-data-view table-responsive">
                <Button
                  onClick={showModal}
                  type="primary"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  Добавить
                </Button>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  locale={{ emptyText: <Empty description={false} /> }}
                  loading={isTableLoading}
                />
              </TableWrapper>
            </div>
          </Cards>
        </Col>
      </Row>
      <Modal visible={state.visible}>
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
                  onSearch={(e) => {
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

              {/* <div className="record-form-actions text-right">
                  <Button htmlType="submit" type="primary">
                     {isLoading ? 'Загрузка...' : 'Обновить'}
                    </Button>
                  </div>
                        */}
            </Form>
          </BasicFormWrapper>
        </div>
      </Modal>
    </>
  );
};

export default Work;
