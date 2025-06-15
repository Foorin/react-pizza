import { CartPizza } from '../redux/slices/cartSlice';
import { calcTotalCount } from './caclTotalCount';
import { calcTotalPrice } from './caclTotalPrice';

export const getPizzasFromLS = () => {
  const pizzaLS = window.localStorage.getItem('cartPizzas');
  const jsonPizzas = pizzaLS ? JSON.parse(pizzaLS) : [];

  const totalPrice = calcTotalPrice(jsonPizzas);
  const totalCount = calcTotalCount(jsonPizzas);
  return {
    jsonPizzas: jsonPizzas as CartPizza[],
    totalCount,
    totalPrice,
  };
};
