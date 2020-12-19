import React from 'react';
import { Col, Row } from 'antd';
import { Aside, Content } from './overview/style';

const AuthLayout = (WraperContent) => {
  return () => {
    return (
      <Row>
        <Col xxl={8} xl={8} lg={10} md={10} xs={24}>
          <Aside>
            <div className="auth-side-content main-logo">
              {/* <img src={require('../../../static/img/auth/topShape.png')} alt="" className="topShape" />
              <img src={require('../../../static/img/auth/bottomShape.png')} alt="" className="bottomShape" /> */}
              <Content style={{ zIndex: 100 }}>
                <img src={require('../../../static/img/logo.svg')} alt="" fill={'#fff'} />

                {/* <Heading as="h1">Сервис</Heading>
                <img
                  className="auth-content-figure"
                  src={require('../../../static/img/auth/Illustration.png')}
                  alt=""
                /> */}
              </Content>
            </div>
          </Aside>
        </Col>

        <Col xxl={16} xl={16} lg={14} md={14} xs={24}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
