import { CartPizza } from '../redux/slices/cartSlice';

export const calcTotalCount = (pizzas: CartPizza[]) => {
  return pizzas.reduce((count, pizza) => count + pizza.count, 0);
};
