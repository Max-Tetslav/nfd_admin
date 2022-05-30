import { FormikHelpers } from 'formik';
import { ReactNode } from 'react';

export interface IOrderOptionItem {
  name: string;
  type: string;
  status: boolean;
  id: number;
}

export interface IMenuItem {
  text: string;
  page: string;
  img: ReactNode;
  id: number;
  sub?: {
    text: string;
    page: string;
  };
}

export interface ITableHeader {
  name: string;
  key: string;
}

export interface ITableColumn {
  title: string;
  dataIndex?: string;
  key: string;
  render?: (record: unknown) => ReactNode;
}

export enum ETableTypes {
  CATEGORY = 'category',
  CITY = 'city',
  ORDER = 'order',
  RATE = 'rate',
  RATE_TYPE = 'tariffType',
  STATUS = 'status',
  CAR = 'car',
  POINT = 'point',
}

export enum ETableFormTypes {
  ADD = 'add',
  EDIT = 'edit',
}

export type TTableFormTypes = ETableFormTypes.ADD | ETableFormTypes.EDIT;

export interface IPointDataList {
  city: string;
  point: string;
}

export type TFormikSubmit<T> = (
  values: T,
  { setSubmitting }: FormikHelpers<T>,
) => void;

export interface IFormRateType {
  name: string;
  unit: string;
}

export interface IFormRate {
  rateType: string;
  price: number;
}

export interface IFormPoint {
  name: string;
  city: string;
  address: string;
}

export interface IFormName {
  name: string;
}

export interface IFormCategory {
  name: string;
  description: string;
}

export interface IFormCar {
  model: string;
  category: string;
  number: string;
  minPrice: number;
  maxPrice: number;
  tank: number;
  description: string;
  imgSize: number;
  imgType: string;
  imgSrc: string;
  imgName: string;
  color: string;
  colorList: string[];
}

export interface IFormOrder {
  point: string;
  rate: string;
  status: string;
  color: string;
  car: string;
  tank: boolean;
  chair: boolean;
  wheel: boolean;
  dateFrom: number;
  dateTo: number;
  totalTime: number;
  price: number;
  city: string;
  imgSrc: string;
}
