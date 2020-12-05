import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Spin, Skeleton } from 'antd';
import { Switch, NavLink, Route, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from '../Style';
import { initProduct, sorting, search } from '../../../redux/product/actionCreator';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { rememberCart } from '../../../redux/cart/actionCreator';
import Cookies from 'js-cookie';

const Filters = lazy(() => import('./overview/Filters'));
const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

const Product = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.headerSearchData);
  const { productsAll, user } = useSelector((state) => {
    return {
      user: state.auth.user,
      productsAll: state.products.data,
    };
  });

  const [state, setState] = useState({
    notData: [],
    active: 'active',
    sorted: 0,
  });

  const { notData } = state;

  const handleSearch = (searchText) => {
    dispatch(search(searchText));
    const data = productsAll.filter((item) => item.name.toUpperCase().startsWith(searchText.toUpperCase()));
  };

  const onSorting = (e) => {
    if (state.sorted === 0) {
      setState({ sorted: 1 });
      dispatch(sorting(e.target.value, productsAll, state.sorted));
    } else {
      setState({ sorted: 0 });
      dispatch(sorting(e.target.value, productsAll, state.sorted));
    }
  };

  useEffect(() => {
    dispatch(initProduct());
  }, []);

  return (
    <>
      <PageHeader
        ghost
        title="Магазин"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Заявка на добавление продукта
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={30}>
          <Col className="product-sidebar-col" xxl={5} xl={7} lg={7} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton paragraph={{ rows: 22 }} active />
                </Cards>
              }
            >
              <Filters />
            </Suspense>
          </Col>
          <Col className="product-content-col" xxl={19} lg={17} md={14} xs={24}>
            <TopToolBox>
              <Row gutter={0}>
                <Col xxl={7} lg={12} xs={24}>
                  <AutoComplete
                    onSearch={handleSearch}
                    dataSource={notData}
                    placeholder="Поиск"
                    width="100%"
                    patterns
                  />
                </Col>

                <Col xxl={10} xs={24}>
                  <div className="product-list-action d-flex justify-content-between align-items-center">
                    <div className="product-list-action__tab">
                      <span className="toolbox-menu-title"> Сортировать:</span>
                      <Radio.Group defaultValue="rate">
                        <Radio.Button value="name" onClick={onSorting}>
                          Название
                        </Radio.Button>
                        <Radio.Button value="price" onClick={onSorting}>
                          Цена
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    {(window.innerWidth <= 991 && window.innerWidth >= 768) ||
                      (window.innerWidth > 575 && (
                        <div className="product-list-action__viewmode">
                          <NavLink to={`${path}/grid`}>
                            <FeatherIcon icon="grid" size={16} />
                          </NavLink>
                          <NavLink to={`${path}/list`}>
                            <FeatherIcon icon="list" size={16} />
                          </NavLink>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
            </TopToolBox>

            <Switch>
              <Suspense
                fallback={
                  <div className="spin d-flex align-center-v">
                    <Spin />
                  </div>
                }
              >
                <Route exact path={path} component={Grid} />
                <Route exact path={`${path}/grid`} component={Grid} />
                <Route exact path={`${path}/list`} component={List} />
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Product;
