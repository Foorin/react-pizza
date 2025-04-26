import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterId: 0,
  currentPage: 2,
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
  },
});

export const { setFilterId, setSortType, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;
