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
}

export interface ITableHeader {
  name: string;
  key: string;
}

export interface ITableColumn {
  title: string;
  dataIndex?: string;
  key: string;
  render?: () => ReactNode;
}

export enum ETableTypes {
  CATEGORY = 'category',
  CITY = 'city',
  ORDER = 'order',
  RATE = 'rate',
  STATUS = 'status',
  CAR = 'car',
  POINT = 'point',
}
