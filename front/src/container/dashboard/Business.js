import React, { lazy, Suspense } from 'react';
import { Col, Row, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

const CardGroup = lazy(() => import('./overview/business/CardGroup'));
const CashFlow = lazy(() => import('./overview/business/CashFlow'));
const IncomeAndExpenses = lazy(() => import('./overview/business/IncomeAndExpenses'));
const AccountGroup = lazy(() => import('./overview/business/AccountGroup'));

const Business = () => {
  return (
    <>
      <PageHeader ghost title="Финансы" />
      <Main>
        <Row gutter={25}>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <CardGroup />
            </Suspense>
          </Col>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <CashFlow />
            </Suspense>
          </Col>
          <Col md={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <IncomeAndExpenses />
            </Suspense>
          </Col>
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <AccountGroup />
          </Suspense>
        </Row>
      </Main>
    </>
  );
};

export default Business;
