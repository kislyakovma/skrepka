import React, {useState} from 'react';
import FeatherIcon from 'feather-icons-react';
import {Link} from 'react-router-dom/cjs/react-router-dom.min';
import {Rate} from 'antd';
import {useDispatch} from 'react-redux';
import {Cards} from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import {Sidebar, SidebarSingle} from '../../Style';
import {
    filterByBrand,
    filterByCategory,
    filterByPriceRange,
    filterByRating,
} from '../../../../redux/product/actionCreator';

const Filters = () => {
  const [state, setState] = useState({
    min: 0,
    max: 1500,
  });
  const dispatch = useDispatch();

  const { min, max } = state;
  const onChange = value => {
    setState({
      ...state,
      min: value[0],
      max: value[1],
    });
    dispatch(filterByPriceRange(value));
  };
  const onChangeRating = checkValue => {
    dispatch(filterByRating([checkValue]));
  };
  const onChangeBrand = checkValue => {
    dispatch(filterByBrand([checkValue]));
  };
  const options = [
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={5} disabled />
          </span>
          <span className="rating-right">25</span>
        </>
      ),
      value: 5,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={4} disabled />
            and up
          </span>
          <span className="rating-right">25</span>
        </>
      ),
      value: 4,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={3} disabled />
            and up
          </span>
          <span className="rating-right">25</span>
        </>
      ),
      value: 3,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={2} disabled />
            and up
          </span>
          <span className="rating-right">25</span>
        </>
      ),
      value: 2,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={1} disabled />
            and up
          </span>
          <span className="rating-right">25</span>
        </>
      ),
      value: 1,
    },
  ];

  const optionsBrand = [
    {
      label: (
        <>
          Cup <span className="brand-count">25</span>
        </>
      ),
      value: 'cup',
    },
    {
      label: (
        <>
          Plate <span className="brand-count">25</span>
        </>
      ),
      value: 'plate',
    },
    {
      label: (
        <>
          Chair <span className="brand-count">25</span>
        </>
      ),
      value: 'chair',
    },
    {
      label: (
        <>
          Juice <span className="brand-count">25</span>
        </>
      ),
      value: 'juice',
    },
  ];

  const onChangeCategory = value => {
    dispatch(filterByCategory(value));
  };

  return (
    <Sidebar>
      <Cards
        title={
          <span>
            <FeatherIcon icon="sliders" size={14} />
            Фильтры
          </span>
        }
      >
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Категории</Heading>

          <nav>
            <ul className="atbd-category-list">
              <li>
                <Link onClick={() => onChangeCategory('all')} to="#">
                  <span>Все</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => onChangeCategory('stationery')} to="#">
                  <span>Канцелярские товары</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => onChangeCategory('protection')} to="#">
                  <span>Средства индивидуальной защиты</span>
                </Link>
              </li>
            </ul>
          </nav>
        </SidebarSingle>
      </Cards>
    </Sidebar>
  );
};

export default Filters;
