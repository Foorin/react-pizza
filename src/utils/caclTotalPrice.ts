import { CartPizza } from '../redux/slices/cartSlice';

export const calcTotalPrice = (pizzas: CartPizza[]) => {
  return pizzas.reduce((sum, pizza) => sum + pizza.price * pizza.count, 0);
};
