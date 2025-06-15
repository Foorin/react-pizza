import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logoPizza from '../../assets/img/pizza-logo.svg';
import Search from '../Search/Search';
import { WhiteCartIcon } from '../../assets/icons';
import { selectCart } from '../../redux/slices/cartSlice';
import { useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const location = useLocation();

  const { pizzas, totalPrice, totalCount } = useSelector(selectCart);
  const isMounted = useRef(false);

  useEffect(() => {
    //проверка, чтобы при первом рендере пустой массив пицц не закидывался в localStorage
    if (isMounted.current) {
      const json = JSON.stringify(pizzas);
      window.localStorage.setItem('cartPizzas', json);
    }
    isMounted.current = true;
  }, [totalCount]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoPizza} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        <div className="header__cart">
          {location.pathname !== '/cart' && (
            <Link to="cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <WhiteCartIcon />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
