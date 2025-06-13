import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logoPizza from '../../assets/img/pizza-logo.svg';
import Search from '../Search/Search';
import { WhiteCartIcon } from '../../assets/icons';
import { selectCart } from '../../redux/slices/cartSlice';

const Header:React.FC = () => {
  const location = useLocation();
  const { totalPrice, totalCount } = useSelector(selectCart);
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
        <Search />
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
