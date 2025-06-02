import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BlackCartIcon, GreyBackIcon, GreyTrashIcon } from '../assets/icons';
import CartPizzaBlock from '../components/CartPizzaBlock/CartPizzaBlock';
import { clearPizzas, selectCart } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty/CartEmpty';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { totalPrice, totalCount } = useSelector(selectCart);
  const cartPizzas = useSelector(
    (state) =>
      //@ts-ignore
      state.cart.pizzas,
  );

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearPizzas());
    }
  };

  if (totalPrice === 0) return <CartEmpty />;
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <BlackCartIcon />
            Корзина
          </h2>
          <div className="cart__clear" onClick={onClickClear}>
            <GreyTrashIcon />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {cartPizzas.map((pizza) => (
            <CartPizzaBlock key={`${pizza.id}-${pizza.type}-${pizza.size}`} {...pizza} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Всего пицц: <b>{totalCount} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>{totalPrice} ₽</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <GreyBackIcon />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
