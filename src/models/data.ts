export interface IPageAndLimitParams {
  page: number;
  limit?: number;
}

export interface IResponse<T> {
  data: Array<T>;
  count: number;
}

export interface ICarParams extends IPageAndLimitParams {
  category: string | null;
}

export interface IOrderParams extends IPageAndLimitParams {
  city?: string | null;
  rate?: string | null;
  status?: string | null;
}

export interface INameAndID {
  name: string;
  id: string;
}

export interface ICategory extends INameAndID {
  description: string;
}

export interface ICar {
  priceMax: number;
  priceMin: number;
  colors: string[];
  description: string;
  name: string;
  number: string;
  tank: number;
  categoryId: ICategory;
  id: string;
  thumbnail: {
    mimetype: string;
    originalname: string;
    path: string;
    size: number;
  };
}

export interface IPoint {
  name: string;
  address: string;
  id: string;
  cityId: INameAndID;
}

export interface IRate {
  price: number;
  id: string;
  rateTypeId: {
    id: string;
    name: string;
    unit: string;
  };
}

export interface IOrderData {
  carId: ICar;
  cityId: INameAndID | null;
  color: string;
  createdAt: number;
  dateFrom: number;
  dateTo: number;
  id: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  orderStatusId: INameAndID;
  pointId: IPoint | null;
  price: number;
  rateId: IRate;
  updatedAt: number;
}
