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
  img: string;
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
  RATE_TYPE = 'rateType',
  STATUS = 'status',
  CAR = 'car',
  POINT = 'point',
}

export enum ETableFormTypes {
  ADD = 'add',
  EDIT = 'edit',
}

export type TTableFormTypes = ETableFormTypes.ADD | ETableFormTypes.EDIT;

export interface ICarFormValues {
  model: string;
  category: string;
  number: string;
  minPrice: string;
  maxPrice: string;
  tank: string;
  description: string;
  imgSize: string;
  imgType: string;
  imgSrc: string;
  imgName: string;
  color: string;
  colorList: string[];
}

export interface IOrderFormValues {
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
}

export interface IPointDataList {
  city: string;
  point: string;
}
