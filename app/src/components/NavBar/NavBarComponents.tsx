import React, { MouseEvent, useState } from 'react';
import NextLink from 'next/link';
import styles from './NavBar.module.scss';

interface NavBarWrapperProps {
  title: string;
  titleHref: string;
}

export const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ title, titleHref, children }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.maxWidthWrapper}>
        <div className={styles.brandTitle}>
          <NextLink href={titleHref}><a>{title}</a></NextLink>
        </div>
        <a href="#" className={styles.toggleButton} onClick={() => { setShowNavbar(!showNavbar) }}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </a>
        <div className={`${styles.navbarLinks} ${showNavbar ? styles.active : null}`}>
          <ul>
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
}


interface NavBarLinkProps {
  href: string;
  name: string;
  key: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
};

export const NavBarLink: React.FC<NavBarLinkProps> = ({ href, name, key, onClick }) => {
  return (
    <li key={key}>
      <NextLink href={href}>
        <a onClick={onClick ? onClick : undefined}>{name}</a>
      </NextLink>
    </li>
  );
};
