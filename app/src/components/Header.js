import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { GiHamburgerMenu } from '../store/assets/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  appBar: {
    boxShadow: 'none',
    background: 'white',
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(1),
    background: '#3f3f3f',
  },
  title: {
    flexGrow: 1,
    color: '#3f3f3f',
  },
  text: {
    color: '#3f3f3f',
    marginRight: theme.spacing(4),
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <header>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            🏡 LA Landscaping and gardening
          </Typography>
          <div>
            <Typography variant='p' className={classes.text}>
              (123) 456-7890
            </Typography>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <GiHamburgerMenu />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
