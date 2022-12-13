import React, {useEffect, useRef, PropsWithChildren} from 'react';
import gsap from 'gsap';
import type {PageProps} from 'gatsby';

// Global Styles
import 'styles/index.css';
import Layout from 'components/Layout';
import Mouse from 'components/Mouse';

import {active as mouseActiveClass} from 'components/Mouse/styles.module.css';
// Scripts

type PageWrapperProps = {
  children: React.ReactElement<any | string | React.JSXElementConstructor<any>>;
} & PageProps;

const PageWrapper: React.FC<PageProps> = ({children, location}) => {
  const mouseRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(mouseRef.current!, {
      duration: 0.3,
      x: e.pageX,
      y: e.pageY - window.pageYOffset,
      ease: 'Power3.out',
    });
  };

  function handleMouseOverInteractiveLink(this: typeof mouseRef.current) {
    this?.classList.add(mouseActiveClass);
  }

  function handleMouseOutInteractiveLink(
    this: typeof mouseRef.current,
    e: Event
  ) {
    this?.classList.remove(mouseActiveClass);
    gsap.to(e.currentTarget, {x: 0, y: 0});
  }

  const handleLinkMotion = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const amount = 3;
    let rect = target.getBoundingClientRect();
    let relX = e.pageX - rect.left;
    let relY = e.pageY - rect.top;
    const posX = (relX - rect.width / 2) / amount;
    const posY = (relY - rect.height / 2 - window.pageYOffset) / amount;
    gsap.to(target, {
      x: posX,
      y: posY,
      ease: 'Power3.out',
    });
  };

  useEffect(() => {
    const mouseInteractLinks = document.querySelectorAll(
      '[data-mouse-interact]'
    );

    const mouse = mouseRef.current;

    mouseInteractLinks.forEach(link => {
      link.addEventListener(
        'mouseover',
        handleMouseOverInteractiveLink.bind(mouse)
      );
      link.addEventListener(
        'mouseout',
        handleMouseOutInteractiveLink.bind(mouse)
      );
      link.addEventListener('mousemove', handleLinkMotion as EventListener);
    });

    return () => {
      mouseInteractLinks.forEach(link => {
        link.removeEventListener(
          'mouseover',
          handleMouseOverInteractiveLink.bind(mouse)
        );
        link.removeEventListener(
          'mouseout',
          handleMouseOutInteractiveLink.bind(mouse)
        );
        link.removeEventListener(
          'mousemove',
          handleLinkMotion as EventListener
        );
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Layout>{children}</Layout>
      <Mouse ref={mouseRef} />
    </>
  );
};

export default PageWrapper;
