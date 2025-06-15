import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getPizzasFromLS } from '../../utils/getPizzasFromLS';
import { calcTotalPrice } from '../../utils/caclTotalPrice';
import { calcTotalCount } from '../../utils/caclTotalCount';

export type CartPizza = {
  id: string;
  price: number;
  title: string;
  count: number;
  imageURL: string;
  type: string;
  size: number;
};

type MatchPizza = {
  id: string;
  type: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  pizzas: CartPizza[];
}

const cartPizzas = getPizzasFromLS();

const initialState: CartSliceState = {
  totalPrice: cartPizzas.totalPrice,
  totalCount: cartPizzas.totalCount,
  pizzas: cartPizzas.jsonPizzas,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOnePizza(state, action: PayloadAction<CartPizza>) {
      const matchPizza = state.pizzas.find(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size,
      );
      if (matchPizza) {
        matchPizza.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.pizzas);
      state.totalCount = calcTotalCount(state.pizzas);
    },

    removeOnePizza(state, action: PayloadAction<MatchPizza>) {
      const matchPizza = state.pizzas.find(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size,
      );

      if (matchPizza) {
        if (matchPizza.count > 1) {
          matchPizza.count--;
        } else {
          state.pizzas = state.pizzas.filter(
            (pizza) =>
              !(
                pizza.id === action.payload.id &&
                pizza.type === action.payload.type &&
                pizza.size === action.payload.size
              ),
          );
        }
      }

      state.totalPrice = calcTotalPrice(state.pizzas);
      state.totalCount = calcTotalCount(state.pizzas);
    },

    deletePizzas(state, action: PayloadAction<MatchPizza>) {
      const { id, type, size } = action.payload;
      const pizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === id && pizza.type === type && pizza.size === size,
      );
      if (pizzaIndex !== -1) {
        state.pizzas.splice(pizzaIndex, 1);
      }

      state.totalPrice = calcTotalPrice(state.pizzas);
      state.totalCount = calcTotalCount(state.pizzas);
    },

    clearPizzas(state) {
      state.pizzas = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    // setSelectedSize(state, action) {
    //   const { pizzaId, sizeIndex } = action.payload;
    //   state.selectedSizes[pizzaId] = sizeIndex;
    // },
    // setSelectedType(state, action) {
    //   const { pizzaId, typeIndex } = action.payload;
    //   state.selectedTypes[pizzaId] = typeIndex;
    // },
  },
});

export const selectCartPizzaById = (id: string) => (state: RootState) =>
  state.cart.pizzas.find((pizza) => pizza.id === id);
export const selectCart = (state: RootState) => state.cart;
export const {
  addOnePizza,
  removeOnePizza,
  clearPizzas,
  deletePizzas,
  // setSelectedSize,
  // setSelectedType,
} = cartSlice.actions;

export default cartSlice.reducer;
