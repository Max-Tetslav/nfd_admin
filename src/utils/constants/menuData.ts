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
    img: listIcon,
    id: 1,
  },
  {
    text: 'Категории автомобилей',
    page: 'category',
    img: listIcon,
    id: 2,
  },
  {
    text: 'Города',
    page: 'city',
    img: listIcon,
    id: 3,
  },
  {
    text: 'Пункты выдачи',
    page: 'point',
    img: listIcon,
    id: 4,
  },
  {
    text: 'Тарифы',
    page: 'rate',
    img: listIcon,
    id: 5,
  },
  {
    text: 'Статусы заказов',
    page: 'status',
    img: infoIcon,
    id: 6,
  },
];

export default menuData;
