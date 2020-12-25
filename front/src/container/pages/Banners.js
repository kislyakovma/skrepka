import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCard3,
  BannerCta,
  BannerCta2,
  BannerCard4,
} from '../../components/banners/Banners';

const Banners = () => {
  return (
    <>
      <PageHeader title="Услуги" buttons={[]} />
      <Main>
        <Row gutter={25}>
          <Col xxl={8} md={12} xs={24}>
            <BannerCard2 />
          </Col>
          <Col xxl={8} md={12} xs={24}>
            <BannerCard3 />
          </Col>
          <Col xxl={8} md={12} xs={24}>
            <BannerCard4 />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Banners;
