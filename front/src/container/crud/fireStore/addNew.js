import React from 'react';
import {Col, Form, Input, Row, Select, Spin, Upload} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import {RecordFormWrapper} from './style';
import {PageHeader} from '../../../components/page-headers/page-headers';
import {Cards} from '../../../components/cards/frame/cards-frame';
import {Button} from '../../../components/buttons/buttons';

import {BasicFormWrapper, Main} from '../../styled';
import {fbDataSubmit, fbFileClear, fbFileUploder, fbNewUser} from '../../../redux/firestore/actionCreator';
import Heading from '../../../components/heading/heading';

const { Option } = Select;

const AddNew = () => {
  const dispatch = useDispatch();
  const { isLoading, url, isFileLoading } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      url: state.crud.url,
      isFileLoading: state.crud.fileLoading,
    };
  });

  const [form] = Form.useForm();

  const handleSubmit = values => {
    dispatch(fbNewUser(values));
    dispatch(
      fbDataSubmit('users', {
        ...values,
        url,
        id: values.email,
      }),
    ).then();
    form.resetFields();
    dispatch(fbFileClear());
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

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/firestore/fbView">Показать всех</Link>
          </Button>,
        ]}
        ghost
        title="Новый пользователь"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                <Row justify="center">
                  <Col xl={10} md={16} xs={24}>
                    <BasicFormWrapper>
                      <Form
                        className="add-record-form"
                        style={{ width: '100%' }}
                        layout="vertical"
                        form={form}
                        name="addnew"
                        onFinish={handleSubmit}
                      >
                        <figure className="pro-image align-center-v">
                          <img
                            src={url === null ? require('../../../static/img/avatar/profileImage.png') : url}
                            alt=""
                          />
                          <figcaption>
                            <Upload {...props}>
                              <Link className="upload-btn" to="#">
                                <FeatherIcon icon="camera" size={16} />
                              </Link>
                            </Upload>
                            <div className="info">
                              <Heading as="h4">Фото</Heading>
                            </div>
                            {isFileLoading && (
                              <div className="isUploadSpain">
                                <Spin />
                              </div>
                            )}
                          </figcaption>
                        </figure>
                        <Form.Item name="name" label="Имя">
                          <Input placeholder="Имя" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email' }]} label="Email">
                          <Input placeholder="example@gmail.com" />
                        </Form.Item>
                        <Form.Item name="password" label="Пароль">
                          <Input placeholder="Пароль" type="password" />
                        </Form.Item>
                        <Form.Item name="country" initialValue="" label="Страна">
                          <Select style={{ width: '100%' }}>
                            <Option value="">Страна</Option>
                            <Option value="russia">Россия</Option>
                            <Option value="ukraine">Украина</Option>
                            <Option value="belarus">Беларусь</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="company" label="Компания">
                          <Input placeholder="Название компании" />
                        </Form.Item>
                        <Form.Item name="position" label="Должность">
                          <Input placeholder="Должность" />
                        </Form.Item>

                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {isLoading ? 'Загрузка...' : 'Добавить'}
                          </Button>
                        </div>
                      </Form>
                    </BasicFormWrapper>
                  </Col>
                </Row>
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNew;
