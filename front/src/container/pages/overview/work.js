import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {BasicFormWrapper} from '../../styled';
import {Button} from '../../../components/buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../../components/heading/heading';
import { Col, DatePicker, Form, Input, Radio, Row, Select, Spin, Upload, notification, AutoComplete} from 'antd';

const dateFormat = 'MM/DD/YYYY';

const Work = () => {
  const [form] = Form.useForm();

  const { isLoading} = useSelector((state) => {
    return { 
      isLoading: state.crud.loading,
    };
  });

  const [state, setState] = useState({
    values: '',
    inn: '',
    address:'',
    companies: '',
    kpp: '',
    bik: '',
    rs: '',
    bank: '',
  });

  const handleSubmit = values => {
    setState({ ...state, values });
  };

  useEffect(() => {
    form.setFieldsValue({
      address: state.address,
      companies: state.companies,
      kpp: state.kpp,
      inn: state.inn
    })
  }, [state.address]);
  
  const getCompany = (query) => {
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
    const token = '6fcdc1c4c6caa6c32fb55b731b2bae0816c9f188';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({ query: query }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => setState({ ...state, searchSuggest: result.suggestions }))

      .catch((error) => console.log('error', error));
  };



  return (
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
                              allowClear={true}
                              filterOption={false}
                              notFoundContent={<p>Введите ИНН</p>}
                              placeholder='ИНН'
                              onSearch={(e) =>{
                                getCompany(e);
                              }}
                              onSelect={(e, option) =>{
                                setState({ ...state, 
                                  address: option.data.address.value, 
                                  companies: e,
                                  kpp: option.data.kpp,
                                  inn: option.data.inn
                                })
                              }}
                              />
                            </Form.Item>
                            <Form.Item name="address" label="Адрес компании">
                              <Input
                              placeholder='Адрес компании'
                              />
                            </Form.Item>
                            <Form.Item name="companies" label="Название компании">
                            <Input
                            placeholder='Название компании'
                              defaultValue={state.companies}
                              />
                            </Form.Item>
                            <Form.Item name="kpp" label="КПП">
                            <Input
                            placeholder='КПП'
                              defaultValue={state.kpp}
                              />
                            </Form.Item>
                            <Form.Item name="bik" label="Бик банка">
                            <Input
                            placeholder='Бик банка'
                              defaultValue={state.bik}
                              />
                            </Form.Item>
                            <Form.Item name="bank" label="Название Банка">
                            <Input
                            placeholder='Название Банка'
                              defaultValue={state.bank}
                              />
                            </Form.Item>
                            <Form.Item name="rs" label="Расчетный счет">
                            <Input
                            placeholder='Расчетный счет'
                              defaultValue={state.rs}
                              />
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
  );
};



export default Work;
