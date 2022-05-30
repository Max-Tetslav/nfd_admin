import React, { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { IFormOrder } from '@models/app';
import formatPrice from '@utils/helpers/formatPrice';

const OrderEditPrice: FC = () => {
  const { values, touched, setFieldValue, isSubmitting } =
    useFormikContext<IFormOrder>();

  useEffect(() => {
    if (touched.chair && !isSubmitting) {
      if (values.chair) {
        setFieldValue('price', (values.price += 200));
      } else if (values.price >= 200)
        setFieldValue('price', (values.price -= 200));
    }
  }, [values.chair, touched.chair]);

  useEffect(() => {
    if (touched.tank && !isSubmitting) {
      if (values.tank) {
        setFieldValue('price', (values.price += 500));
      } else if (values.price >= 500)
        setFieldValue('price', (values.price -= 500));
    }
  }, [values.tank, touched.tank]);

  useEffect(() => {
    if (touched.wheel && !isSubmitting) {
      if (values.wheel) {
        setFieldValue('price', (values.price += 1600));
      } else if (values.price >= 1600)
        setFieldValue('price', (values.price -= 1600));
    }
  }, [values.wheel, touched.wheel]);

  useEffect(() => {
    if (values.price < 0) {
      setFieldValue('price', 0);
    }
  }, [values.price]);

  return <p>Итого: {formatPrice(values.price)}</p>;
};

export default OrderEditPrice;
