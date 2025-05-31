import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrangePlusIcon } from '../../assets/icons';
import { addOnePizzas } from '../../redux/slices/cartSlice';
import { selectCartPizzaById } from '../../redux/slices/cartSlice';

function PizzaBlock({ id, title, price, imageURL, sizes, types }) {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const typePizza = ['тонкое', 'традиционное'];

  const [activeSize, setActiveSize] = React.useState(0);

  const cartPizza = useSelector(selectCartPizzaById(id));
  const addedCountPizza = cartPizza ? cartPizza.count : 0;

  const onClickAddPizza = () => {
    const pizza = {
      id,
      title,
      price,
      imageURL,
      type: typePizza[activeType],
      size: sizes[activeSize],
    };
    dispatch(addOnePizzas(pizza));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageURL} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
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
}

export default PizzaBlock;
