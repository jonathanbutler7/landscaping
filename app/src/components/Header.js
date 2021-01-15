import React from 'react';
import classes from './Header.module.scss';
import { GiHamburgerMenu } from '../store/index';

export default function Header() {
  
  return (
    <header>
      <div className={classes.main}>
        <div>
          <h1 className={classes.title}>🏡 LA Landscaping and gardening</h1>
          <div>
            <p className={classes.text}>(123) 456-7890</p>
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
