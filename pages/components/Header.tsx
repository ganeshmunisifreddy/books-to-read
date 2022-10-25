import React from 'react';
import { BookOpenVariant, Heart } from 'mdi-material-ui';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <BookOpenVariant />
      </div>
      <div className={styles.wishlist}>
        <Heart />
        Wishlist
      </div>
    </header>
  );
};

export default Header;
