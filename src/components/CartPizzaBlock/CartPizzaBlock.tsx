import React from 'react';
import { useDispatch } from 'react-redux';

import { OrangeMinusIcon, OrangePlusIcon, GreyDeleteIcon } from '../../assets/icons';
import { addOnePizza, removeOnePizza, deletePizzas } from '../../redux/slices/cartSlice';

type CartProps = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageURL: string;
  type: string;
  size: number;
}

const CartPizzaBlock: React.FC<CartProps> = ({ id, title, price, count, imageURL, type, size }) => {
  const dispatch = useDispatch();

  const onClickAddPizza = () => {
    const pizza = {
      id, 
      price,
      title,
      count,
      imageURL, 
      type,
      size,
    };
    dispatch(addOnePizza(pizza));
  };
  const onClickRemovePizza = () => {
    const pizza = {
      id,
      type,
      size,
    };
    dispatch(removeOnePizza(pizza));
  };

  const onClickDelete = () => {
    const pizza = {
      id,
      type,
      size,
    };
    dispatch(deletePizzas(pizza));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageURL} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          onClick={onClickRemovePizza}>
          <OrangeMinusIcon />
        </button>
        <b>{count}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onClickAddPizza}>
          <OrangePlusIcon />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button className="button button--outline button--circle" onClick={onClickDelete}>
          <GreyDeleteIcon />
        </button>
      </div>
    </div>
  );
};
export default CartPizzaBlock;
