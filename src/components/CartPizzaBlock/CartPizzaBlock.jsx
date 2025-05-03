import React from 'react';
import { useDispatch} from 'react-redux';

import { OrangeMinusIcon, OrangePlusIcon, GreyDeleteIcon } from '../../constants/icons';
import { addOnePizzas, removeOnePizzas, deletePizzas } from '../../redux/slices/cartSlice';

function CartPizzaBlock({ id, title, price, count, imageURL, type, size }) {
  const dispatch = useDispatch();

  const onClickAddPizza = () => {
    console.log('plus click');
    const pizza = {
      id,
      type,
      size,
    };
    dispatch(addOnePizzas(pizza));
  };
  const onClickRemovePizza = () => {
    console.log('minus click');
    const pizza = {
      id,
      type,
      size,
    };
    dispatch(removeOnePizzas(pizza));
  };

  const onClickDelete = () => {
    console.log('delete click');
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
        <div
          className="button button--outline button--circle cart__item-count-minus"
          onClick={onClickRemovePizza}>
          <OrangeMinusIcon />
        </div>
        <b>{count}</b>
        <div
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onClickAddPizza}>
          <OrangePlusIcon />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle" onClick={onClickDelete}>
          <GreyDeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default CartPizzaBlock;
