import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/store';

const useFormConfirm = (
  confirmAction: (data: object) => Promise<unknown>,
  reduxAction: (payload: boolean | null) => {
    payload: boolean | null;
    type: string;
  },
  pageType: string,
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmHandler = useCallback((values: object) => {
    confirmAction(values).then((data) => {
      const result = (data as { data: unknown }).data;

      dispatch(reduxAction(Boolean(result)));
      setTimeout(() => {
        dispatch(reduxAction(null));
      }, 4000);
      navigate(`/admin/${pageType}`);
    });
  }, []);

  return confirmHandler;
};

export default useFormConfirm;
