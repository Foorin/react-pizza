import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, currentPage, sortType } = params;
  const res = await axios.get(
    `https://67e5ce1418194932a5874a0d.mockapi.io/pizzasItems?page=${currentPage}&${category}${search}&sortBy=${sortType.sortProperty}&order=asc`,
  );
  return res.data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.pizzas = [];
      });
  },
});
export const selectPizza = (state) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
