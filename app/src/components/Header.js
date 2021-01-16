import React from 'react';
import classes from './Header.module.scss';
import { GiHamburgerMenu, FaPhoneAlt } from '../store/index';

export default function Header() {
  return (
      <header className={classes.main}>
        <div className={classes.left}>
          <h1 className={classes.title}>🏡 LA Landscaping and gardening</h1>
        </div>
        <div className={classes.right}>
          <FaPhoneAlt />
          <p>(123) 456-7890</p>
          <GiHamburgerMenu />
        </div>
      </header>
    
  );
}
