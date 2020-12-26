import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { updateWishList } from '../../../../redux/product/actionCreator';
import { Button } from '../../../../components/buttons/buttons';
import { cartAdd } from '../../../../redux/cart/actionCreator';

const DetailsRight = ({ product }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    quantity: 1,
  });

  const { name, rate, price, oldPrice, description, category, brand, popular, img } = product;
  const { quantity } = state;

  const incrementQuantity = (e) => {
    e.preventDefault();
    if (quantity !== 5)
      setState({
        ...state,
        quantity: quantity + 1,
      });
  };

  const decrementQuantity = (e) => {
    e.preventDefault();
    if (quantity !== 1)
      setState({
        ...state,
        quantity: quantity - 1,
      });
  };

  return (
    <div className="product-details-box__right pdbr">
      <Heading className="pdbr__title" as="h2">
        {name}
      </Heading>
      <p>
        <span className="pdbr__brand-text">Брэнд: </span>
        <span className="pdbr__brand-name"> {brand}</span>
      </p>
      <Heading className="pdbr__new-price" as="h3">
        <span className="pdbr__price">{price}</span>
        <span className="pdbr__currency">₽</span>
      </Heading>
      {oldPrice && (
        <Heading className="pdbr__old-price" as="h6">
          <del>${oldPrice}</del> <span className="pdbr__offer-price">30% Off</span>
        </Heading>
      )}
      <p className="pdbr__desc">{description}</p>
      <div className="pdbr__current-status">
        <p>
          <span className="current-status-title">Наличие:</span>
          <span className="stock-status in-stock">Много</span>
        </p>

        <p className="pdbr__quantity">
          <span className="current-status-title">Количество:</span>

          <Button className="btn-inc" onClick={decrementQuantity} type="default">
            -
          </Button>
          {quantity}
          <Button className="btn-dec" onClick={incrementQuantity} type="default">
            +
          </Button>
          {/* <span className="pdbr__availability">540 pieces available</span> */}
        </p>
      </div>

      <div className="pdbr__Actions d-flex align-items-center">
        <div className="pdbr__product-action">
          <Button
            className="btn-cart"
            size="default"
            type="secondary"
            onClick={() => {
              dispatch(cartAdd(product));
            }}
          >
            <FeatherIcon icon="shopping-bag" size={14} /> В корзину
          </Button>
          <Button
            onClick={() => dispatch(updateWishList(parseInt(id, 10)))}
            className="btn-icon"
            size="default"
            raised
            type="white"
            shape="circle"
          >
            <FeatherIcon
              icon="heart"
              size={14}
              color={popular ? '#FF4D4F' : '#9299B8'}
              fill={popular ? '#FF4D4F' : 'none'}
            />
          </Button>
          <Button className="btn-icon" size="default" raised type="white" shape="circle">
            <FeatherIcon icon="share-2" size={14} />
          </Button>
        </div>
      </div>

      <ul className="pdbr__list">
        <li>
          <span>Категория:</span>
          <span>Канцелярский товар</span>
        </li>
      </ul>
    </div>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
