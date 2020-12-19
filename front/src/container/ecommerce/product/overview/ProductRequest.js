import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../../components/buttons/buttons';
import { Modal } from '../../../../components/modals/antd-modals';
import { CheckboxGroup } from '../../../../components/checkbox/checkbox';
import { BasicFormWrapper } from '../../../styled';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const ProductRequest = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const options = [
    {
      label: 'Privet',
      value: 'privet',
    },
    {
      label: 'Team',
      value: 'team',
    },
    {
      label: 'Public',
      value: 'public',
    },
  ];

  return (
    <Modal
      type={state.modalType}
      title="Запрос на добавление продукта"
      visible={state.visible}
      footer={[
        <div className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            Запросить
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Отмена
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Form.Item name="project" label="">
              <Input placeholder="Название" />
            </Form.Item>

            <Form.Item name="description" label="">
              <Input.TextArea rows={4} placeholder="Дополнительная информация" />
            </Form.Item>
            <Form.Item name="pricacy" initialValue={['team']} label="Необходимое количество">
              <CheckboxGroup options={options} />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

ProductRequest.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default ProductRequest;
