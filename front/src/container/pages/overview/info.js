import React, {useState} from 'react';
import {Col, Form, Input, Row, Select, Upload} from 'antd';
import {Link} from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import {BasicFormWrapper} from '../../styled';
import {Button} from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

const { Option } = Select;
const Info = () => {
  const [state, setState] = useState({
    values: '',
  });
  const [form] = Form.useForm();
  const handleSubmit = values => {
    setState({ ...state, values });
  };

  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Информация о пользователе
              </Heading>

              <figure className="photo-upload align-center-v">
                <img src={require('../../../static/img/avatar/profileImage.png')} alt="" />
                <figcaption>
                  <Upload>
                    <Link className="btn-upload" to="#">
                      <FeatherIcon icon="camera" size={16} />
                    </Link>
                  </Upload>
                  <div className="info">
                    <Heading as="h4">Фото профиля</Heading>
                  </div>
                </figcaption>
              </figure>

              <Form.Item label="Имя" name="name">
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                label="email"
                name="email"
                rules={[{ message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>

              <Form.Item name="phone" label="Номер телефона">
                <Input placeholder="8 800 555 35 35 - проще позвонить" />
              </Form.Item>

              <Form.Item name="country" initialValue="" label="страна">
                <Select style={{ width: '100%' }}>
                  <Option value="">Please Select</Option>
                  <Option value="bangladesh">РФ</Option>
                  <Option value="india">Укры</Option>
                  <Option value="pakistan">Картошка</Option>
                </Select>
              </Form.Item>

              <Form.Item initialValue="" name="city" label="Город">
                <Select style={{ width: '100%' }}>
                  <Option value="">Please Select</Option>
                  <Option value="dhaka">Москва</Option>
                  <Option value="khulna">Киiв</Option>
                  <Option value="barisal">Картошка</Option>
                </Select>
              </Form.Item>

              <Form.Item name="website" label="Website">
                <Input placeholder="www.example.com" />
              </Form.Item>

              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      return form.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button htmlType="submit" type="primary">
                    <Link to="work">Save & Next</Link>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
