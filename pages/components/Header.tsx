import React from 'react';
import { BookOpenVariant, Heart } from 'mdi-material-ui';
import styles from './Header.module.scss';
import { Button } from '@mui/material';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <BookOpenVariant />
      </div>
      <Button className={styles.wishlist}>
        <Heart />
        Wishlist
      </Button>
    </header>
  );
};

export default Header;
