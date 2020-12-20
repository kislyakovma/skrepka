import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { ComingsoonStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const ComingSoon = () => {
  const Completionist = () => <span>You are good to go!</span>;
  return (
    <>
      <PageHeader title="" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <ComingsoonStyleWrapper>
              <Cards headless>
                <div className="strikingDash-logo"></div>
                <div className="coming-soon-content">
                  <h1>Запуск скоро</h1>
                  <p>Уведомления о выходе новых функций:</p>
                </div>

                <div className="subscription-form">
                  <Form name="basic">
                    <div className="subscription-form-inner">
                      <Form.Item name="email" rules={[{ type: 'email', message: 'Please input your username!' }]}>
                        <Input placeholder="Электронная почта" />
                      </Form.Item>
                      <Button size="large" type="primary" htmlType="submit">
                        Подписаться
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="coming-soon-social">
                  <ul>
                    <li>
                      <Link to="#" className="facebook">
                        <FontAwesome name="vk" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="instagram">
                        <FontAwesome name="instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Cards>
            </ComingsoonStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ComingSoon;
