import React, { useEffect } from 'react';

type TSetAnimate = React.Dispatch<React.SetStateAction<boolean>>;

const useAnimate = (setAnimate: TSetAnimate) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
};

export default useAnimate;
