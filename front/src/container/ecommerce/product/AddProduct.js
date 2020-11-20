import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import { toast } from 'react-toastify';
import Heading from '../../../components/heading/heading';
import { useSelector, useDispatch } from 'react-redux';
import { fbDataSubmit, fbFileUploder, fbFileClear } from '../../../redux/firestore/actionCreator';

const { Option } = Select;
const { Dragger } = Upload;

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const fileList = [];

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
    },
  };

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit('products', {
        ...values,
        id: Date.now(),
        modified: false,
      }),
    ).then(() => {
      // toast.dark('Товар вскоре будет добавлен!', {
      //   position: 'top-right',

      //   autoClose: 2500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      form.resetFields();
    });
  };

  return (
    <>
      <Main style={{ background: '#fff' }}>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Новый товар">
                                  <Form.Item name="status" label="Поставщик">
                                    <Radio.Group>
                                      <Radio value="officemag">Офисмаг</Radio>
                                      <Radio value="wildberries">Wildberries</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <Form.Item name="category" label="Категория">
                                    <Radio.Group>
                                      <Radio value="stationary">Канцелярский товар</Radio>
                                      <Radio value="protection">Средство индивидуальной защиты</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <Form.Item name="url" label="Ссылка">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="imgUrl" label="Ссылка на изображение">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item name="profit" label="Прибыль">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend f">
                                        <FeatherIcon icon="percent" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Отменить
                            </Button>
                            <Button size="large" htmlType="submit" type="primary" raised>
                              Создать продукт
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
