import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useGetItemName = (banner?: boolean) => {
  const location = useLocation();

  const itemName = useMemo(() => {
    if (location.pathname.includes('category')) {
      return banner ? 'категория' : 'категорию';
    }
    if (location.pathname.includes('city')) {
      return 'город';
    }
    if (location.pathname.includes('point')) {
      return 'пункт выдачи';
    }
    if (location.pathname.includes('rate')) {
      return 'тариф';
    }
    if (location.pathname.includes('tariffType')) {
      return 'тип тарифа';
    }
    if (location.pathname.includes('status')) {
      return 'статус заказа';
    }
    if (location.pathname.includes('car')) {
      return 'автомобиль';
    }
    if (location.pathname.includes('order')) {
      return 'заказ';
    }
  }, [location]);

  return itemName;
};

export default useGetItemName;
