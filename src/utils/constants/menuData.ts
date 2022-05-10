import personIcon from '@assets/svg/person.svg';
import infoIcon from '@assets/svg/info.svg';
import listIcon from '@assets/svg/list.svg';

const menuData = [
  {
    text: 'Список заказов',
    page: 'orders',
    img: personIcon,
    id: 0,
  },
  {
    text: 'Автомобили',
    page: 'cars',
    img: listIcon,
    id: 1,
  },
  {
    text: 'Категории автомобилей',
    page: 'categories',
    img: listIcon,
    id: 2,
  },
  {
    text: 'Пункты выдачи',
    page: 'points',
    img: listIcon,
    id: 4,
  },
  {
    text: 'Тарифы',
    page: 'rates',
    img: listIcon,
    id: 5,
  },
  {
    text: 'Типы тарифов',
    page: 'rateTypes',
    img: infoIcon,
    id: 6,
  },
  {
    text: 'Статусы заказов',
    page: 'orderStatuses',
    img: infoIcon,
    id: 7,
  },
];

export default menuData;
