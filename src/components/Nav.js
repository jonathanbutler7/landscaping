import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ['mowing', 'gardening', 'landscaping'];
  return (
    <div>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <Link to={`/${option}`}>
            <StyledMenuItem>
              <ListItemText primary={option} />
            </StyledMenuItem>
          </Link>
        ))}
      </StyledMenu>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h2>
          {' '}
          <Link onClick={handleClick}>Landing Page</Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link to='/order'>Order</Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link to='/worker'>Worker</Link>
        </h2>
      </nav>
    </div>
  );
}
