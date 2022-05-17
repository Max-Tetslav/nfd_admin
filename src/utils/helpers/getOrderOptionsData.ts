import { IOrderOptionItem } from '@models/app';

const getOrderOptions = (
  tank: boolean,
  chair: boolean,
  wheel: boolean,
): IOrderOptionItem[] => [
  {
    name: 'Полный бак',
    type: 'tank',
    status: tank,
    id: 0,
  },
  {
    name: 'Детское кресло',
    type: 'chair',
    status: chair,
    id: 1,
  },
  {
    name: 'Правый руль',
    type: 'wheel',
    status: wheel,
    id: 2,
  },
];

export default getOrderOptions;
