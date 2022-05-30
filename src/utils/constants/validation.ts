import * as Yup from 'yup';

export const RATE_TYPE_VALIDATION = Yup.object({
  name: Yup.string().required('Обязательное поле!'),
  unit: Yup.string().required('Обязательное поле!'),
});

export const CAR_VALIDATION = Yup.object({
  model: Yup.string().required('Обязательное поле!'),
  category: Yup.string().required('Обязательное поле!'),
  description: Yup.string().required('Обязательное поле!'),
  number: Yup.string().required('Обязательное поле!'),
  minPrice: Yup.number().required('Обязательное поле!'),
  maxPrice: Yup.number().required('Обязательное поле!'),
  tank: Yup.number()
    .required('Обязательное поле!')
    .min(1, 'Минимальное значение: 1')
    .max(100, 'Максимальное значение: 100'),
  imgSize: Yup.number()
    .required('Загрузите фото автомобиля!')
    .lessThan(2000000, 'Максимальный размер: 2 МБ'),
  colorList: Yup.array().min(1, 'Добавьте минимум один цвет'),
});

export const ORDER_VALIDATION = Yup.object({
  car: Yup.string().required('Обязательное поле!'),
  color: Yup.string().required('Обязательное поле!'),
  point: Yup.string().required('Обязательное поле!'),
  status: Yup.string().required('Обязательное поле!'),
});

export const RATE_VALIDATION = Yup.object({
  rateType: Yup.string().required('Обязательное поле!'),
  price: Yup.number().required('Обязательное поле!'),
});

export const POINT_VALIDATION = Yup.object({
  name: Yup.string().required('Обязательное поле!'),
  city: Yup.string().required('Обязательное поле!'),
  address: Yup.string().required('Обязательное поле!'),
});

export const NAME_VALIDATION = Yup.object({
  name: Yup.string().required('Обязательное поле!'),
});

export const CATEGORY_VALIDATION = Yup.object({
  name: Yup.string().required('Обязательное поле!'),
  description: Yup.string().required('Обязательное поле!'),
});
