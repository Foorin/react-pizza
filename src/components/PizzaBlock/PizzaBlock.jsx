import React from 'react';

import { OrangePlusIcon } from '../../constants/icons';

function PizzaBlock({ title, price, imageURL, sizes, types }) {
  const [acitveType, setActiveType] = React.useState(0);
  const typePizza = ['тонкое', 'традиционное'];

  const [activeSize, setActiveSize] = React.useState(0);
  // let [pizzaCount, setPizzaCount] = React.useState(0);
  // const addButton = () => {
  //   setPizzaCount(pizzaCount + 1);
  // };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageURL} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        {/* <ul>
          {types.map((type) => {
            <li>{type}</li>
          })}
        </ul> */}
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={acitveType === type ? 'active' : ''}>
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
        <div className="pizza-block__price">от {price}</div>
        <button className="button button--outline button--add">
          <OrangePlusIcon />
          <span>Добавить</span>
          <i>0</i>
        </button>
      </div>
    </div>
  );
}
export default PizzaBlock;
