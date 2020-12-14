import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Radio, Row, Select, Spin, Upload } from 'antd';
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
import { companyPush } from '../../../redux/company/actionCreator';
import { fbDataSingle, fbDataUpdate, fbFileUploder } from '../../../redux/firestore/actionCreator';
import Heading from '../../../components/heading/heading';
import { tr } from 'react-date-range/dist/locale';
import { companyPull } from '../../../redux/company/actionCreator';

const { Option } = Select;
const Edit = ({ match }) => {
  const dispatch = useDispatch();

  const { crud, isLoading, companyList } = useSelector((state) => {
    return {
      crud: state.singleCrud.data,
      isLoading: state.crud.loading,
      user: state.auth.user,
      companyList: state.company.data,
    };
  });
  const [state, setState] = useState({
    join: null,
    searchSuggest: [],
    selected: [],
    id: match.params.id,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(companyPull(state.id));
  }, []);
  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(match.params.id));
    }
  }, [dispatch, match.params.id]);

  useEffect(()=> {console.log(options);},[state.searchSuggest])

  const handleSubmit = (values) => {
    console.log(state.selected);
    console.log(state.id);
    console.log(state.searchSuggest);
    if (state.searchSuggest.length > 0){
    state.selected.forEach((item) => {  
      console.log(item);
      dispatch(companyPush(addCompany(item.value), state.id));
    });
  }
  };

  const addCompany = (inn) => {
    state.searchSuggest.map(item => {
      console.log(item+ "YA HUY!!!");
      if (item.data.inn === inn) {
        return item
      }else if(item.data.finance){
        if (item.data.finance.inn === inn){
        return item
        }
      }
    })
  }

  const formatCompany = (list) => {
    
    let result = [];
    list.forEach((item) => {
      if (item.data.inn){
      result.push({value: item.data.inn, label: item.value}); 
    }else{
      if(item.data.finance){
      result.push({value: item.data.finance.inn, label: item.value}); 
      }
    }
    });
    return result;
  
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
  let options =
  state.searchSuggest.map((item) => {
    let innUniq = item.data.inn? item.data.inn: item.data.finance ? item.data.finance.inn: 'ЧМО!!!!';
    console.log(' тип ITEM VALUE' + typeof(item.value) + ' ', typeof(innUniq));
    
     
     console.log('INN' + innUniq);
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
                            initialValues={{ companies: formatCompany(companyList) }}
                          >
                            <Form.Item name="companies" label="Компании">
                              <Select
                                // showSearch={true}
                                labelInValue
                                // defaultValue = {formatCompany(companyList)}
                                filterOption = {false}
                                style={{ width: '100%' }}
                                mode={'multiple'}
                                notFoundContent={<p>Введите название компании</p>}
                                onSearch={(e) => {
                                  console.log(e);
                                  getCompany(e);
                                }}
                                onSelect={(e) => {
                                  setState({ ...state, selected: state.selected.concat((e)) });
                                }}
                                onDeselect={(e) => {
                                  setState({
                                    ...state,
                                    selected: state.selected.filter((item) => JSON.stringify(item) !== e),
                                  });
                                }}
                              >
                                {options}
                              </Select>
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
