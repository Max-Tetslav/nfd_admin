import React, { FC, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateCarColors, updateCarCurrent } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormOrder,
  TTableFormTypes,
} from '@models/app';
import AuthInput from '../authInput/AuthInput';
import ColorListInput from '../colorListInput/ColorListInput';
import EditCheckbox from '../editCheckbox/EditCheckbox';
import EditDatepicker from '../editDatepicker/EditDatepicker';
import EditSelect from '../editSelect/EditSelect';
import cl from './AdminEdit.module.scss';

interface IAdminEditProps {
  type: string;
  formType: TTableFormTypes;
}

const AdminEdit: FC<IAdminEditProps> = ({ type, formType }) => {
  const dispatch = useAppDispatch();
  const { values, setFieldValue, touched } = useFormikContext();
  const cityList = useAppSelector((state) => state.form.city.list);
  const rateTypeList = useAppSelector((state) => state.form.rateType.list);
  const colorList = useAppSelector((state) => state.form.car.colors);
  const statusList = useAppSelector((state) => state.form.status.list);
  const carList = useAppSelector((state) => state.form.car.list);
  const pointList = useAppSelector((state) => state.form.point.list);
  const pointDataList = useAppSelector((state) => state.form.point.dataList);
  const categoryList = useAppSelector(
    (state) => state.filters.car.all.category,
  );

  useEffect(() => {
    dispatch(updateCarCurrent((values as IFormOrder).car));

    if ((values as IFormOrder)?.car) {
      if ((touched as IFormOrder)?.car) {
        dispatch(updateCarColors(null));
        setFieldValue('color', '');
      }
    }
  }, [(values as IFormOrder)?.car]);

  useEffect(() => {
    if ((values as IFormOrder)?.point) {
      if ((touched as IFormOrder)?.point) {
        const cityId =
          pointDataList?.filter(
            (item) => item.point === (values as IFormOrder)?.point,
          )[0]?.city || '';
        setFieldValue('city', cityId);
      }
    }
  }, [(values as IFormOrder)?.point]);

  const content = useMemo(() => {
    switch (type) {
      case ETableTypes.CATEGORY:
        return (
          <>
            <AuthInput
              labelClass={cl.label}
              label="Название"
              type="text"
              name="name"
              adminPage
            />
            <AuthInput
              labelClass={cl.label}
              label="Описание"
              as="textarea"
              type="textarea"
              name="description"
              adminPage
            />
          </>
        );
        break;
      case ETableTypes.CITY:
        return (
          <AuthInput
            labelClass={cl.label}
            label="Название"
            type="text"
            name="name"
            adminPage
          />
        );
        break;
      case ETableTypes.POINT:
        return (
          <>
            <AuthInput
              labelClass={cl.label}
              label="Название"
              type="text"
              name="name"
              adminPage
            />
            <EditSelect
              list={cityList}
              label="Город"
              placeholder="Выберите город"
              type="text"
              name="city"
            />
            <AuthInput
              labelClass={cl.label}
              label="Адрес"
              type="text"
              name="address"
              adminPage
            />
          </>
        );
        break;
      case ETableTypes.RATE:
        return (
          <>
            <EditSelect
              list={rateTypeList}
              label="Тип тарифа"
              placeholder="Выберите тип тарифа"
              type="text"
              name="rateType"
            />
            <AuthInput
              labelClass={classNames(cl.label, cl.number)}
              label="Цена"
              type="number"
              name="price"
              min={0}
              adminPage
            />
          </>
        );
        break;
      case ETableTypes.RATE_TYPE:
        return (
          <>
            <AuthInput
              labelClass={cl.label}
              label="Название"
              type="text"
              name="name"
              adminPage
            />
            <AuthInput
              labelClass={cl.label}
              label="Длительность"
              type="text"
              name="unit"
              adminPage
            />
          </>
        );
        break;
      case ETableTypes.STATUS:
        return (
          <AuthInput
            labelClass={cl.label}
            label="Название"
            type="text"
            name="name"
            adminPage
          />
        );
        break;
      case ETableTypes.CAR:
        return (
          <>
            <AuthInput
              labelClass={classNames(cl.label, cl.autoLabel)}
              label="Модель"
              type="text"
              name="model"
              adminPage
            />
            <EditSelect
              list={categoryList}
              label="Категория"
              placeholder="Выберите категорию"
              type="text"
              name="category"
            />
            <AuthInput
              labelClass={classNames(cl.textarea)}
              inputClass={cl.description}
              label="Описание"
              as="textarea"
              type="text"
              name="description"
              adminPage
            />
            <AuthInput
              labelClass={classNames(cl.label, cl.autoNumber)}
              label="Госномер"
              type="text"
              name="number"
              adminPage
            />
            <AuthInput
              labelClass={classNames(cl.label, cl.number)}
              label="Бак заправлен на %"
              type="number"
              name="tank"
              min={0}
              adminPage
            />
            <AuthInput
              labelClass={classNames(cl.label, cl.number)}
              label="Минимальная цена"
              type="number"
              name="minPrice"
              min={0}
              adminPage
            />
            <AuthInput
              labelClass={classNames(cl.label, cl.number)}
              label="Максимальная цена"
              type="number"
              name="maxPrice"
              min={0}
              adminPage
            />
            <ColorListInput
              inputClass={cl.description}
              label="Доступные цвета"
              list={[]}
              checkedList={[]}
              name="color"
              type="text"
              adminPage
            />
          </>
        );
        break;
      case ETableTypes.ORDER:
        return (
          <>
            <EditSelect
              list={carList}
              label="Модель авто"
              placeholder="Выберите модель авто"
              type="text"
              name="car"
            />
            <EditSelect
              list={pointList}
              label="Пункт выдачи"
              placeholder="Выберите пункт выдачи"
              type="text"
              name="point"
            />
            <EditSelect
              list={colorList}
              label="Цвет"
              placeholder="Выберите цвет"
              type="text"
              name="color"
            />
            <EditSelect
              list={statusList}
              label="Статус заказа"
              placeholder="Выберите статус заказа"
              type="text"
              name="status"
            />
            <EditCheckbox
              name="tank"
              type="checkbox"
              label="Полный бак"
              adminEdit
            />
            <EditCheckbox
              name="chair"
              type="checkbox"
              label="Детское кресло"
              adminEdit
            />
            <EditCheckbox
              name="wheel"
              type="checkbox"
              label="Правый руль"
              adminEdit
            />
            <EditDatepicker
              label="Дата начала аренды"
              placeholder="Выберите дату начала аренды"
              type="datetime-local"
              name="dateFrom"
            />
            <EditDatepicker
              label="Дата окончания аренды"
              placeholder="Выберите дату начала аренды"
              type="datetime-local"
              name="dateTo"
              readonly
            />
          </>
        );
        break;

      // no default
    }
  }, [
    type,
    categoryList,
    cityList,
    rateTypeList,
    colorList,
    statusList,
    carList,
    pointList,
  ]);

  const title = useMemo(() => {
    switch (formType) {
      case ETableFormTypes.ADD:
        return 'Добавить ';
        break;
      case ETableFormTypes.EDIT:
        return 'Изменить ';
        break;
      default:
        return '';
    }
  }, [formType]);

  const subTitle = useMemo(() => {
    switch (type) {
      case ETableTypes.ORDER:
        return 'заказ';
        break;
      case ETableTypes.CATEGORY:
        return 'категорию авто';
        break;
      case ETableTypes.CITY:
        return 'город';
        break;
      case ETableTypes.POINT:
        return 'пункт выдачи';
        break;
      case ETableTypes.STATUS:
        return 'статус заказа';
        break;
      case ETableTypes.RATE:
        return 'тариф';
        break;
      case ETableTypes.RATE_TYPE:
        return 'тип тарифа';
        break;
      case ETableTypes.CAR:
        return 'авто';
        break;
      default:
        return '';
    }
  }, [type]);

  return (
    <div className={cl.container}>
      <h2 className={cl.title}>{title + subTitle}</h2>
      <div className={cl.inputBox}>{content}</div>
    </div>
  );
};

export default AdminEdit;
