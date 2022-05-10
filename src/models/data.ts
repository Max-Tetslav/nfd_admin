export interface ICar {
  priceMax: number;
  priceMin: number;
  name: string;
  number: string;
  tank: number;
  thumbnail: {
    mimetype: string;
    originalname: string;
    path: string;
    size: number;
  };
}

export interface INameAndID {
  name: string;
  id: string;
}

export interface IPoint {
  name: string;
  address: string;
  id: string;
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
  cityId: INameAndID;
  color: string;
  createdAt: number;
  dateFrom: number;
  dateTo: number;
  id: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  orderStatusId: INameAndID;
  pointId: IPoint;
  price: number;
  rateId: IRate;
  updatedAt: number;
}

export interface IOrderOptionItem {
  name: string;
  type: string;
  status: boolean;
  id: number;
}
