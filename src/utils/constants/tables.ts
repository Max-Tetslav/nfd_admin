import { ITableHeader } from '@models/app';

export const DATA_ERROR_MESSAGE = 'Нет данных';
export const NO_PHOTO = 'Нет фото';

export const CATEGORY_HEADERS: ITableHeader[] = [
  {
    name: 'Название',
    key: 'name',
  },
  {
    name: 'Описание',
    key: 'description',
  },
  {
    name: 'ID',
    key: 'id',
  },
];

export const NAME_AND_ID_HEADERS: ITableHeader[] = [
  {
    name: 'Название',
    key: 'name',
  },
  {
    name: 'ID',
    key: 'id',
  },
];

export const POINT_HEADERS: ITableHeader[] = [
  {
    name: 'Название',
    key: 'name',
  },
  {
    name: 'Город',
    key: 'city',
  },
  {
    name: 'Адресс',
    key: 'address',
  },
  {
    name: 'ID',
    key: 'id',
  },
];

export const RATE_HEADERS: ITableHeader[] = [
  {
    name: 'Название',
    key: 'name',
  },
  {
    name: 'Длительность',
    key: 'duration',
  },
  {
    name: 'Цена',
    key: 'price',
  },
  {
    name: 'ID',
    key: 'id',
  },
];

export const RATE_TYPE_HEADERS: ITableHeader[] = [
  {
    name: 'Название',
    key: 'name',
  },
  {
    name: 'Длительность',
    key: 'duration',
  },
  {
    name: 'ID',
    key: 'id',
  },
];
