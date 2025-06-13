import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
// это тип всего редакса для типизации стейтов НЕ В СЛАЙСЕ А ВНЕ ЕГО
export type RootState = ReturnType<typeof store.getState>;

//"продвинутый диспатч" нужен так как диспатч принимает объекты, а мы ему в home.tsx даем асинхронный экшен
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
