import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICarFilters,
  IOrderFilters,
  TCarTempFilterList,
  TOrderTempFilterList,
} from '@models/store';

interface IFiltersInitialState {
  order: {
    filterStatus: boolean;
    tempList: IOrderFilters;
    finalList: IOrderFilters;
  };
  car: {
    filterStatus: boolean;
    tempList: ICarFilters;
    finalList: ICarFilters;
  };
}

const initialState: IFiltersInitialState = {
  order: {
    filterStatus: false,
    tempList: {
      city: null,
      rate: null,
      status: null,
    },
    finalList: {
      city: null,
      rate: null,
      status: null,
    },
  },
  car: {
    filterStatus: false,
    tempList: {
      category: null,
    },
    finalList: {
      category: null,
    },
  },
};

const filterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCarFilters: (state) => {
      state.car.filterStatus = false;
      state.car.tempList.category = null;
      state.car.finalList.category = null;
    },
    clearOrderFilters: (state) => {
      state.order.filterStatus = false;
      state.order.tempList = {
        city: null,
        rate: null,
        status: null,
      };
      state.order.finalList = {
        city: null,
        rate: null,
        status: null,
      };
    },
    updateCarFilter: (state, action: PayloadAction<TCarTempFilterList>) => {
      state.car.tempList = { ...state.car.tempList, ...action.payload };
    },
    updateOrderFilter: (state, action: PayloadAction<TOrderTempFilterList>) => {
      state.order.tempList = { ...state.order.tempList, ...action.payload };
    },
    applyOrderFilters: (state) => {
      state.order.filterStatus = true;
      state.order.finalList = state.order.tempList;
    },
    applyCarFilters: (state) => {
      state.car.filterStatus = true;
      state.car.finalList = state.car.tempList;
    },
  },
});

export const {
  applyCarFilters,
  applyOrderFilters,
  updateOrderFilter,
  updateCarFilter,
  clearOrderFilters,
  clearCarFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
