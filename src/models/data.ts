export interface IPageAndLimitParams {
  page: number;
  limit?: number;
}

export interface IResponse<T> {
  data: Array<T>;
  count: number;
  error?: unknown;
}

export interface IResponseItem<T extends object> {
  data: T;
  error?: unknown;
}

export interface IPostResponse<T> {
  data: {
    data: T;
    fields: unknown;
  };
}

export interface IPutArgs<T extends object> {
  data: T;
  id: string;
}

export interface ICarParams extends IPageAndLimitParams {
  category?: string | null;
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

export type TPostName = Omit<INameAndID, 'id'>;

export interface ICategory extends INameAndID {
  description: string;
}

export type TPostCategory = Omit<ICategory, 'id'>;

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

export type TPostCar = {
  priceMax: number;
  priceMin: number;
  colors: string[];
  description: string;
  name: string;
  number: string;
  tank: number;
  categoryId: {
    id: string;
  };
  thumbnail: {
    mimetype: string;
    originalname: string;
    path: string;
    size: number;
  };
};

export interface IPoint {
  name: string;
  address: string;
  id: string;
  cityId: INameAndID;
}

export type TPostPoint = {
  name: string;
  address: string;
  cityId: {
    id: string;
  };
};

export interface IRate {
  price: number;
  id: string;
  rateTypeId: {
    id: string;
    name: string;
    unit: string;
  };
}

export interface IRateType {
  id: string;
  name: string;
  unit: string;
}

export type TPostRate = {
  price: number;
  rateTypeId: {
    id: string;
  };
};

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

export type TPostOrderData = {
  carId: Pick<ICar, 'id'>;
  cityId: Pick<INameAndID, 'id'> | null;
  color: string;
  dateFrom: number;
  dateTo: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  orderStatusId: Pick<INameAndID, 'id'>;
  pointId: Pick<IPoint, 'id'> | null;
  price: number;
  rateId: Pick<IRate, 'id'>;
};
