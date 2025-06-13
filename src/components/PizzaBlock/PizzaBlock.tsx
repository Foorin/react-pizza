import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrangePlusIcon } from '../../assets/icons';
import { addOnePizza, CartPizza } from '../../redux/slices/cartSlice';
import { selectCartPizzaById } from '../../redux/slices/cartSlice';
import { Pizza, selectPizza } from '../../redux/slices/pizzaSlice';
import { Link } from 'react-router-dom';

// type PizzaBlockProps = {
//   id: string;
//   title: string;
//   price: number;
//   imageURL: string;
//   sizes: number[];
//   types: number[];
// };

const PizzaBlock: React.FC<Pizza> = ({ id, title, price, imageURL, sizes, types }) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const typePizza = ['тонкое', 'традиционное'];

  const [activeSize, setActiveSize] = React.useState(0);

  const cartPizza = useSelector(selectCartPizzaById(id));
  const addedCountPizza = cartPizza ? cartPizza.count : 0;

  const onClickAddPizza = () => {
    const pizza: CartPizza = {
      id,
      title,
      price,
      imageURL,
      type: typePizza[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addOnePizza(pizza));
  };

  return (
    <div className="pizza-block">
      <Link key={id} to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageURL} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={activeType === type ? 'active' : ''}>
              {typePizza[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAddPizza} className="button button--outline button--add">
          <OrangePlusIcon />
          <span>Добавить</span>
          {addedCountPizza > 0 && <i>{addedCountPizza}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
