import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type SortObj = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export interface FilterSliceState {
  searchValue: string;
  filterId: number;
  currentPage: number;
  sortType: SortObj;
}

const initialState: FilterSliceState = {
  searchValue: '',
  filterId: 0,
  currentPage: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilterId(state, action: PayloadAction<number>) {
      state.filterId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortObj>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setBackString(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.filterId = Number(action.payload.filterId);
      state.sortType = action.payload.sortType;
    },
  },
});
export const selectFilter = (state: RootState) => state.filter;
export const { setFilterId, setSortType, setCurrentPage, setBackString, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
