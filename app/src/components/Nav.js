import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const options = ['mowing', 'gardening', 'landscaping'];

  return (
    <div>
      {/* <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, key) => (
          <Link to={`/${option}`} key={key}>
            <StyledMenuItem>
              <ListItemText primary={option} />
            </StyledMenuItem>
          </Link>
        ))}
      </StyledMenu> */}
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h2>
          {' '}
          <Link to='/landscaping' onClick={handleClick}>
            <Button color='primary' variant='outlined'>
              Landing page
            </Button>
          </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link to='/order'>
            <Button color='primary' variant='outlined'>
              Order page
            </Button>
          </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link to='/worker'>
            <Button color='primary' variant='outlined'>
              Worker page
            </Button>
          </Link>
        </h2>
      </nav>
    </div>
  );
}
