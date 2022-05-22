import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  IconButton,
  ListItemAvatar,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Assignment, ViewArray } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  container: {
    padding: '1rem',
    height: 0,
    overflowX: 'hidden',
    flex: '1000 1 auto',
    position: 'relative',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    objectFit: 'scale-down',
    maxHeight: '2rem',
    width: 'auto',
    marginRight: '1rem',
  },
  toolbar: {
    position: 'sticky',
    top: 0,
  },
  bottomNav: {
    flexGrow: 1,
    position: 'sticky',
    bottom: 0,
  },
}));

/**
 *
 * @param {string} path
 * @returns
 */
const resolveValue = (path) => {
  if (path.startsWith('/containers/')) {
    return 1;
  }
  return 0;
};

const Page = ({ title, children, ...props }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { reference } = useParams();
  const [value, setValue] = useState(resolveValue(pathname));

  const onClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position='static' color='transparent'>
        <Toolbar className={classes.toolbar}>
          <img src='/icon_x192.png' className={classes.logo} alt='Logo' />
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth='md'
        className={classes.container}
        id='page-container'
        {...props}
      >
        {children}
      </Container>

      <BottomNavigation
        component={Paper}
        elevation={3}
        value={value}
        onChange={onClick}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          component={Link}
          to={'/'}
          label='Containers'
          icon={<ViewArray />}
        />

        <BottomNavigationAction
          component={Link}
          to={`/containers/${reference}/check`}
          label='Check'
          disabled={!reference}
          icon={<Assignment />}
        />

      </BottomNavigation>

    </>
  );
};

export default Page;
