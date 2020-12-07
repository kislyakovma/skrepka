import React, {useState} from 'react';
import {NavLink} from 'react-router-dom/cjs/react-router-dom.min';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {Button, Form, Input} from 'antd';
import {AuthWrapper} from './style';
import {Checkbox} from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import {fbDataSubmit, fbFileClear} from '../../../../redux/firestore/actionCreator';

const SignUp = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = values => {
    if (state.checked) {
      setState({ ...state, values });
      dispatch(
        fbDataSubmit('regRequst', {
          ...values,
          id: Date.now(),
        }),
      );
      dispatch(fbFileClear()).then(() => {
        toast.dark('Заявка отправлена!', {
          position: 'top-right',

          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      toast.dark('Вы должны согласиться с Политикой Конфиденциальности!', {
        position: 'top-right',

        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Есть аккаунт? <NavLink to="/">Войти</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Заявка на <span className="color-secondary">регистрацию</span>
          </Heading>
          <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите полное имя!' }]}>
            <Input placeholder="Имя" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Введите email!', type: 'email' }]}>
            <Input placeholder="name@example.com" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Согласен с Политикой Конфиденциальности</Checkbox>
          </div>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              Заявка
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
