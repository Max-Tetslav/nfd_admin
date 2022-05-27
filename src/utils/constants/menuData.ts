import personIcon from '@assets/svg/person.svg';
import infoIcon from '@assets/svg/info.svg';
import listIcon from '@assets/svg/list.svg';

const menuData = [
  {
    text: 'Список заказов',
    page: 'order',
    img: personIcon,
    id: 0,
  },
  {
    text: 'Автомобили',
    page: 'car',
    sub: {
      text: 'Добавить авто',
      page: 'car/add',
    },
    img: listIcon,
    id: 1,
  },
  {
    text: 'Категории автомобилей',
    page: 'category',
    sub: {
      text: 'Добавить категорию',
      page: 'category/add',
    },
    img: listIcon,
    id: 2,
  },
  {
    text: 'Города',
    page: 'city',
    sub: {
      text: 'Добавить город',
      page: 'city/add',
    },
    img: listIcon,
    id: 3,
  },
  {
    text: 'Пункты выдачи',
    page: 'point',
    sub: {
      text: 'Добавить пункт',
      page: 'point/add',
    },
    img: listIcon,
    id: 4,
  },
  {
    text: 'Тарифы',
    page: 'rate',
    sub: {
      text: 'Добавить тариф',
      page: 'rate/add',
    },
    img: listIcon,
    id: 5,
  },
  {
    text: 'Типы тарифов',
    page: 'tariffType',
    sub: {
      text: 'Добавить тип тарифа',
      page: 'tariffType/add',
    },
    img: listIcon,
    id: 6,
  },
  {
    text: 'Статусы заказов',
    page: 'status',
    sub: {
      text: 'Добавить статус',
      page: 'status/add',
    },
    img: infoIcon,
    id: 7,
  },
];

export default menuData;
