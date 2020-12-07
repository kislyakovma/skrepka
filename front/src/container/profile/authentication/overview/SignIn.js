import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import firebase from '../../../../config/database/firebase';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const isFailedLogin = useSelector((state) => state.auth.failedLogin);
  const isLoggedIn = useSelector((state) => state.auth.login);
  const [form] = Form.useForm();

  const [state, setState] = useState({
    checked: null,
    failed: false,
    submited: false,
  });

  const handleSubmit = (data) => {
    dispatch(login(data.username, data.password)).then(() => {
      state.failed = !isLoggedIn;
    });
    state.submited = !state.submited;
  };

  useEffect(() => {
    if (state.failed) {
      notification.open({
        duration: 3,
        message: 'Неверные данные!',
        description: 'Убедитесь, что ввели верные логин и пароль.',
        className: 'custom-class',
        style: {
          fontFamily: 'Montserrat',
        },
      });
      // toast(' Неверные данные!', {
      //   position: 'top-left',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: false,
      //   progress: undefined,
      //   style: {
      //     fontSize: 20,
      //     fontWeight: '900',
      //   },
      // });
    }
  }, [state.submited]);

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Нет аккаунта? <NavLink to="/register">Регистрация</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical" autoComplete="true">
          <Heading as="h3">
            Войдите в свой <span className="color-secondary">аккаунт</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            initialValue=""
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue=""
            label="Пароль"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Запомнить меня</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Забыли пароль?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Загрузка...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
