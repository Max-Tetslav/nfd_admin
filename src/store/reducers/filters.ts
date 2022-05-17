import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICarAllFilters,
  ICarFilters,
  IOrderAllFilters,
  IOrderFilters,
  TCarTempFilterList,
  TOrderTempFilterList,
} from '@models/store';
import { INameAndID } from '@models/data';

interface IFiltersInitialState {
  order: {
    filterStatus: boolean;
    all: IOrderAllFilters;
    tempList: IOrderFilters;
    finalList: IOrderFilters;
  };
  car: {
    filterStatus: boolean;
    all: ICarAllFilters;
    tempList: ICarFilters;
    finalList: ICarFilters;
  };
}

const initialState: IFiltersInitialState = {
  order: {
    filterStatus: false,
    all: {
      rate: [],
      status: [],
      city: [],
    },
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
    all: {
      category: [],
    },
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
    updataCarAllFilters: (state, action: PayloadAction<INameAndID[]>) => {
      state.car.all = { ...state.car.all, category: action.payload };
    },
    updataOrderAllFilters: (
      state,
      action: PayloadAction<Partial<IOrderAllFilters>>,
    ) => {
      if (action.payload.rate) {
        state.order.all.rate = action.payload.rate;
      }

      if (action.payload.city) {
        state.order.all.city = action.payload.city;
      }

      if (action.payload.status) {
        state.order.all.status = action.payload.status;
      }
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
  updataCarAllFilters,
  updataOrderAllFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
