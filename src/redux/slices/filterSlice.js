import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilterId(state, action) {
      state.filterId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setBackString(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.filterId = Number(action.payload.filterId);
      state.sortType = action.payload.sortType;
    },
  },
});
export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sortType;
export const { setFilterId, setSortType, setCurrentPage, setBackString, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
