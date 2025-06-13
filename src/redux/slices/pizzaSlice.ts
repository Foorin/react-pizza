import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortObj } from './filterSlice';

export type SearchPizzasType = {
  category: string;
  search: string;
  currentPage: number;
  sortType: SortObj;
};
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzasType>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, currentPage, sortType } = params;
    const res = await axios.get<Pizza[]>(
      `https://67e5ce1418194932a5874a0d.mockapi.io/pizzasItems?page=${currentPage}&${category}${search}&sortBy=${sortType.sortProperty}&order=asc`,
    );
    return res.data;
  },
);

export type Pizza = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageURL: string;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizzas = [];
      });
  },
});
export const selectPizza = (state: RootState) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
