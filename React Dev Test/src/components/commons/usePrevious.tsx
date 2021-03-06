import { useRef, useEffect } from 'react';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
    console.log(ref.current);
  });
  return ref.current;
};

export default usePrevious;
