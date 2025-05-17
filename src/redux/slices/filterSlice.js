import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setFilterId, setSortType, setCurrentPage, setBackString } = filterSlice.actions;
export default filterSlice.reducer;
