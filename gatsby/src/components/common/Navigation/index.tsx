import React, {useState} from 'react';
import {Link} from 'gatsby';

import * as styles from './styles.module.css';
import classNames from 'classnames';

interface NavLinkProps {
  to: string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({
  to,
  children,
  onClick: setMobileNavIsOpen,
}) => (
  <Link
    to={to}
    className={styles.navLink}
    activeClassName={styles.active}
    onClick={() => setMobileNavIsOpen(false)}
    data-mouse-interact>
    {children}
  </Link>
);

const Navigation: React.FC = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const renderNavItems = () => (
    <>
      <NavLink to="/about" onClick={setMobileNavIsOpen}>
        About
      </NavLink>
      <NavLink to="/" onClick={setMobileNavIsOpen}>
        Work
      </NavLink>
    </>
  );

  const handleMenuButtonClick: React.MouseEventHandler = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.logo}>
        <svg width="47" height="46" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M4.36 26.38l-1.43-1.44a10 10 0 010-14.14l1.43-1.44 8.51 8.5-8.5 8.52zM41.8 26.38l-8.5-8.51 8.5-8.51 1.44 1.44a10 10 0 010 14.14l-1.43 1.44zM13.73 17.02L5.22 8.5 13.72 0l8.51 8.5zM32.45 17.02L23.94 8.5 32.44 0l8.51 8.5zM23.09 26.38l-8.51-8.51 8.5-8.51 8.51 8.5z"
              fill="#000"
              style={{opacity: 0.3}}
            />
            <path
              d="M4.36 45.1l-1.43-1.44a10 10 0 010-14.14l1.43-1.44 8.51 8.5-8.5 8.52zM41.8 45.1l-8.5-8.51 8.5-8.51 1.44 1.44a10 10 0 010 14.14l-1.43 1.44zM13.73 35.74l-8.51-8.51 8.5-8.5 8.51 8.5zM32.45 35.74l-8.51-8.51 8.5-8.5 8.51 8.5zM23.09 45.1l-8.51-8.51 8.5-8.51 8.51 8.5z"
              fill="#000"
            />
          </g>
        </svg>
      </div>

      <nav className={styles.mainNav}>{renderNavItems()}</nav>

      <nav
        className={classNames(styles.mobileNav, {
          [styles.active]: mobileNavIsOpen,
        })}>
        {renderNavItems()}
      </nav>

      <button
        className={classNames(styles.menuTrigger, {
          [styles.active]: mobileNavIsOpen,
        })}
        onClick={handleMenuButtonClick}>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navigation;
