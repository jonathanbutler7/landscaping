import React, { useState } from 'react';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
import { GiHamburgerMenu, FaPhoneAlt } from '../store/index';

export default function Header() {
  const [state, setState] = useState(false);
  return (
    <header className={classes.main}>
      <div className={classes.left}>
        <h1>
          <Link to='/landscaping'>🌳 LA Landscaping</Link>
        </h1>
      </div>
      <div className={classes.right}>
        <div className={classes.menuContent}>
          <Link to='/worker'>become a worker</Link>
          <FaPhoneAlt />
          <a href='tel:123-123-1234'>(123) 456-7890</a>
          <button className='light-button'>Place an order</button>
        </div>
        <GiHamburgerMenu
          className={classes.hamburger}
          onClick={() => setState(!state)}
        />
        {state && <Drawer state={state} setState={setState} />}
      </div>
    </header>
  );
}
