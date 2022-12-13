import {useEffect} from 'react';
import gsap from 'gsap';

const useDeferAppearance = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: '1',
        }
      );
    }
  }, []);
};

export default useDeferAppearance;
