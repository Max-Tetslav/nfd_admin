import { IPointDataList } from '@models/app';
import { INameAndID } from '@models/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormInitialState {
  car: {
    current: string | null;
    completeList: string[];
    list: INameAndID[] | null;
    colors: INameAndID[] | null;
    currentImg: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  city: {
    current: string;
    list: INameAndID[] | null;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  rateType: {
    list: INameAndID[] | null;
    current: '';
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  category: {
    current: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  point: {
    list: INameAndID[] | null;
    dataList: IPointDataList[] | null;
    current: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  status: {
    list: INameAndID[] | null;
    current: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
  order: {
    current: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
    status: {
      complete: boolean | null;
      cancel: boolean | null;
    };
  };
  rate: {
    list: INameAndID[] | null;
    current: string;
    save: {
      ok: boolean | null;
    };
    delete: {
      ok: boolean | null;
    };
  };
}

const initialState: IFormInitialState = {
  car: {
    current: null,
    completeList: [],
    list: null,
    colors: null,
    currentImg: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  city: {
    current: '',
    list: null,
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  rateType: {
    list: null,
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  category: {
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  point: {
    list: null,
    dataList: null,
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  status: {
    list: null,
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
  order: {
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
    status: {
      complete: null,
      cancel: null,
    },
  },
  rate: {
    list: null,
    current: '',
    save: {
      ok: null,
    },
    delete: {
      ok: null,
    },
  },
};

const carFormSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    pushCompleteList: (state, action: PayloadAction<[string, unknown]>) => {
      if (Array.isArray(action.payload[1])) {
        if (action.payload[1].length) {
          state.car.completeList = [
            ...state.car.completeList,
            action.payload[0],
          ];
        }
      } else if (action.payload[1]) {
        state.car.completeList = [...state.car.completeList, action.payload[0]];
      }

      state.car.completeList = [...new Set(state.car.completeList)];
    },
    popCompleteList: (state, action: PayloadAction<[string, unknown]>) => {
      if (Array.isArray(action.payload[1])) {
        if (!action.payload[1].length) {
          state.car.completeList = state.car.completeList.filter(
            (item) => item !== action.payload[0],
          );
        }
      } else if (!action.payload[1]) {
        state.car.completeList = state.car.completeList.filter(
          (item) => item !== action.payload[0],
        );
      }

      state.car.completeList = [...new Set(state.car.completeList)];
    },
    updateCityList: (state, action: PayloadAction<INameAndID[]>) => {
      state.city.list = action.payload;
    },
    updateRateTypeList: (state, action: PayloadAction<INameAndID[]>) => {
      state.rateType.list = action.payload;
    },
    updateRateList: (state, action: PayloadAction<INameAndID[]>) => {
      state.rate.list = action.payload;
    },
    updateCarList: (state, action: PayloadAction<INameAndID[]>) => {
      state.car.list = action.payload;
    },
    updateCarCurrent: (state, action: PayloadAction<string | null>) => {
      state.car.current = action.payload;
    },
    updateCarCurrentImg: (state, action: PayloadAction<string>) => {
      state.car.currentImg = action.payload;
    },
    updateCarColors: (state, action: PayloadAction<INameAndID[] | null>) => {
      state.car.colors = action.payload;
    },
    updateStatusList: (state, action: PayloadAction<INameAndID[]>) => {
      state.status.list = action.payload;
    },
    updatePointList: (state, action: PayloadAction<INameAndID[]>) => {
      state.point.list = action.payload;
    },
    updatePointDataList: (state, action: PayloadAction<IPointDataList[]>) => {
      state.point.dataList = action.payload;
    },
    updateRateCurrent: (state, action: PayloadAction<string>) => {
      state.rate.current = action.payload;
    },
    updateCategoryCurrent: (state, action: PayloadAction<string>) => {
      state.category.current = action.payload;
    },
    updateStatusCurrent: (state, action: PayloadAction<string>) => {
      state.status.current = action.payload;
    },
    updatePointCurrent: (state, action: PayloadAction<string>) => {
      state.point.current = action.payload;
    },
    updateCityCurrent: (state, action: PayloadAction<string>) => {
      state.city.current = action.payload;
    },
    updateOrderCurrent: (state, action: PayloadAction<string>) => {
      state.order.current = action.payload;
    },
    updateCarSaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.car.save.ok = action.payload;
    },
    updateCarDeleteStatus: (state, action: PayloadAction<boolean | null>) => {
      state.car.delete.ok = action.payload;
    },
    updateOrderSaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.order.save.ok = action.payload;
    },
    updateOrderDeleteStatus: (state, action: PayloadAction<boolean | null>) => {
      state.order.delete.ok = action.payload;
    },
    updateCategorySaveStatus: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.category.save.ok = action.payload;
    },
    updateCategoryDeleteStatus: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.category.delete.ok = action.payload;
    },
    updateCitySaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.city.save.ok = action.payload;
    },
    updateCityDeleteStatus: (state, action: PayloadAction<boolean | null>) => {
      state.city.delete.ok = action.payload;
    },
    updatePointSaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.point.save.ok = action.payload;
    },
    updatePointDeleteStatus: (state, action: PayloadAction<boolean | null>) => {
      state.point.delete.ok = action.payload;
    },
    updateRateSaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.rate.save.ok = action.payload;
    },
    updateRateDeleteStatus: (state, action: PayloadAction<boolean | null>) => {
      state.rate.delete.ok = action.payload;
    },
    updateRateTypeSaveStatus: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.rateType.save.ok = action.payload;
    },
    updateRateTypeDeleteStatus: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.rateType.delete.ok = action.payload;
    },
    updateStatusSaveStatus: (state, action: PayloadAction<boolean | null>) => {
      state.status.save.ok = action.payload;
    },
    updateStatusDeleteStatus: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.status.delete.ok = action.payload;
    },
    updateOrderStatusComplete: (
      state,
      action: PayloadAction<boolean | null>,
    ) => {
      state.order.status.complete = action.payload;
    },
    updateOrderStatusCancel: (state, action: PayloadAction<boolean | null>) => {
      state.order.status.cancel = action.payload;
    },
  },
});

export const {
  pushCompleteList,
  popCompleteList,
  updateCityList,
  updateOrderCurrent,
  updateCityCurrent,
  updatePointCurrent,
  updateStatusCurrent,
  updateCarCurrent,
  updateCategoryCurrent,
  updateRateCurrent,
  updateRateTypeList,
  updateRateList,
  updateCarList,
  updateStatusList,
  updatePointList,
  updateCarColors,
  updateCarCurrentImg,
  updateStatusSaveStatus,
  updateStatusDeleteStatus,
  updateRateTypeSaveStatus,
  updateRateTypeDeleteStatus,
  updateRateSaveStatus,
  updateRateDeleteStatus,
  updatePointSaveStatus,
  updatePointDeleteStatus,
  updateCitySaveStatus,
  updateCityDeleteStatus,
  updateCategorySaveStatus,
  updateCategoryDeleteStatus,
  updateOrderSaveStatus,
  updateOrderDeleteStatus,
  updateCarSaveStatus,
  updateCarDeleteStatus,
  updateOrderStatusComplete,
  updateOrderStatusCancel,
  updatePointDataList,
} = carFormSlice.actions;
export default carFormSlice.reducer;
