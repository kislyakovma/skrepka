import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Radio, Row, Select, Spin, Upload, notification, AutoComplete} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper, Main } from '../../styled';
import { companyDelete, companyPush } from '../../../redux/company/actionCreator';
import { fbDataSingle, fbDataUpdate, fbFileUploder } from '../../../redux/firestore/actionCreator';
import Heading from '../../../components/heading/heading';
import { tr } from 'react-date-range/dist/locale';
import { companyPull } from '../../../redux/company/actionCreator';

const { Option } = Select;
const Edit = ({ match }) => {
  const dispatch = useDispatch();


  const { crud, isLoading, companyList, user } = useSelector((state) => {
    return {
      crud: state.singleCrud.data,
      isLoading: state.crud.loading,
      user: state.auth.user,
      companyList: state.company.data,
    };
  });
  const [state, setState] = useState({
    inn: '',
    address:'',
    companies: '',
    kpp: '',
    bik: '',
    rs: '',
    bank: '',
    join: null,
    searchSuggest: [],
    selected: [],
    deselected: [],
    id: match.params.id,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(companyPull(state.id));
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      address: state.address,
      companies: state.companies,
      kpp: state.kpp,
      inn: state.inn
    })
  }, [state.address]);
  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(match.params.id));
    }
  }, [dispatch, match.params.id]);

  const addCompany = (inn) => {
    let result = {};
    state.searchSuggest.map((item) => {
      if (item.data.inn === inn) {
        result = item;
      } else if (item.data.finance) {
        if (item.data.finance.inn === inn) {
          result = item;
        }
      }
    });
    if (Object.keys(result).length > 0) {
      return result;
    }
  };

  const handleSubmit = (values, flag) => {
    console.log(companyList);
    getByLabel(state.selected, state.deselected)   
    if(state.selected.length > 0 || state.deselected.length > 0){ 
    notification.open({
      duration: 3,
      message: 'Список компаний обновлен!',
      className: 'custom-class',
      style: {
        fontFamily: 'Montserrat',
      },
    }); 
  }
  };



  const getByLabel = (select, deselect) =>{
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
    const token = '6fcdc1c4c6caa6c32fb55b731b2bae0816c9f188';
    if (select.length >0){
    select.forEach((item) =>{
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({ query: item.label }),
      };  

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(item);
        result.suggestions.forEach((e) =>{
          if (e.unrestricted_value == item.label){
            dispatch(companyPush(e, state.id))
            return
          }
        })
        
      })
      .catch((error) => console.log('error', error));
    })
  }
  if(deselect.length > 0){
    console.log(deselect);
    deselect.forEach((item) =>{
        const options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + token,
          },
          body: JSON.stringify({ query: item.label }),
        };  
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          result.suggestions.forEach((e) =>{
            if (e.unrestricted_value == item.label){
              dispatch(companyDelete(e, state.id))
              return
            }
          })
          
        })
        .catch((error) => console.log('error', error));
    })
  }
  }

  const formatCompany = (list) => {
    let result = [];
    if(list.length>0){
    list.forEach((item) => {
      if (item.data.inn) {
        result.push({ value: item.data.inn, label: item.value });
      } else {
        if (item.data.finance) {
          result.push({ value: item.data.finance.inn, label: item.value });
        }
      }
    });
    return result;
  }
  };

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

  const onChange = (date, dateString) => {
    setState({ join: dateString });
  };

  
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: false,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(info.file.originFileObj));
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const deepEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false;
      }
    }
    return true;
  };

  const isObject = (object) => {
    return object != null && typeof object === 'object';
  };
  const duplicate = (item) => {
    let flag = false;
    companyList.forEach((company) => {
      if (deepEqual(item, company)) {
        flag = true;
      }
    });
    return flag;
  };
  let options = state.searchSuggest.map((item) => {
    let innUniq = item.data.inn ? item.data.inn : item.data.finance ? item.data.finance.inn : 'ЧМО!!!!';

    return <Option key={innUniq}>{item.value}</Option>;
  });

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/firestore/fbView">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Редактировать информацию"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {crud === null ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      {
                        <BasicFormWrapper>
                          <Form
                            className="add-record-form"
                            style={{ width: '100%' }}
                            layout="vertical"
                            form={form}
                            name="edit"
                            onFinish={handleSubmit}
                            
                          >
                            {/* <Form.Item name="companies" label="Компании">
                              <Select
                                // showSearch={true}
                                labelInValue
                                // defaultValue = {formatCompany(companyList)}
                                filterOption={false}
                                style={{ width: '100%' }}
                                mode={'multiple'}
                                notFoundContent={<p>Введите название компании</p>}
                                onSearch={(e) => {
                                  getCompany(e);
                                }}
                                onSelect={(e) => {
                                  setState({ ...state, selected: state.selected.concat(e) });
                                }}
                                onDeselect={(e) => {
                                  setState({ ...state, deselected: state.deselected.concat(e) });
                                }}
                              >
                                {options}
                              </Select>
                            </Form.Item> */}
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
                      }
                    </Col>
                  </Row>
                )}
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

Edit.propTypes = {
  match: PropTypes.shape(PropTypes.object).isRequired,
};

export default Edit;
