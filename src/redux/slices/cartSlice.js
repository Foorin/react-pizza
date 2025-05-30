import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  pizzas: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOnePizzas(state, action) {
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
      state.totalPrice = state.pizzas.reduce((sum, pizza) => {
        return sum + pizza.price * pizza.count;
      }, 0);

      state.totalCount = state.pizzas.reduce((count, pizza) => {
        return count + pizza.count;
      }, 0);
    },

    removeOnePizzas(state, action) {
      const { id, type, size } = action.payload;
      const pizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === id && pizza.type === type && pizza.size === size,
      );
      if (pizzaIndex !== -1) {
        const pizza = state.pizzas[pizzaIndex];
        if (pizza.count > 1) {
          pizza.count--;
        } else {
          state.pizzas.splice(pizzaIndex, 1);
        }
      }

      state.totalPrice = state.pizzas.reduce((sum, pizza) => {
        return sum + pizza.price * pizza.count;
      }, 0);

      state.totalCount = state.pizzas.reduce((count, pizza) => {
        return count + pizza.count;
      }, 0);
    },

    deletePizzas(state, action) {
      const { id, type, size } = action.payload;
      const pizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === id && pizza.type === type && pizza.size === size,
      );
      if (pizzaIndex !== -1) {
        state.pizzas.splice(pizzaIndex, 1);
      }

      state.totalPrice = state.pizzas.reduce((sum, pizza) => {
        return sum + pizza.price * pizza.count;
      }, 0);

      state.totalCount = state.pizzas.reduce((count, pizza) => {
        return count + pizza.count;
      }, 0);
    },

    clearPizzas(state) {
      state.pizzas = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    setSelectedSize(state, action) {
      const { pizzaId, sizeIndex } = action.payload;
      state.selectedSizes[pizzaId] = sizeIndex;
    },
    setSelectedType(state, action) {
      const { pizzaId, typeIndex } = action.payload;
      state.selectedTypes[pizzaId] = typeIndex;
    },
  },
});

export const selectCartPizzaById = (id) =>  (state) => state.cart.pizzas.find((pizza) => pizza.id === id);
export const selectCart = (state) => state.cart;
export const {
  addOnePizzas,
  removeOnePizzas,
  clearPizzas,
  deletePizzas,
  setSelectedSize,
  setSelectedType,
} = cartSlice.actions;

export default cartSlice.reducer;
