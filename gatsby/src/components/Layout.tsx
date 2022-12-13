import React from 'react';

import Navigation from 'components/common/Navigation';

import * as styles from 'styles/modules/Layout.module.css';

interface LayoutProps {}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children}) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
