import {useState} from 'react';
import { styled } from '@mui/material/styles';
import './Navigation.scss';
import {Link} from "react-router-dom";

// Design system
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// My Components
import User from '../User';

const Navigation = () => {

  const [drawer, setDrawer] = useState(
    false
  );

  const links = [
    {
      'text': 'Dashboard',
      'to': '/',
    },
    {
      'text': 'Leaderboard',
      'to': '/leaderboard',
    },
    {
      'text': 'Create',
      'to': '/new',
    }
  ]

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  }));

  return (
    <Box component="nav" sx={{ padding: '.5em', borderBottom: '1px solid #EFEFEF' }}>
      <div className="utility">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuOpenIcon />
        </IconButton>
        <User />
      </div>

      <Drawer
        open={drawer}
        onClose={toggleDrawer(false)}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((link, index) => (
            <ListItem key={link.text} disablePadding>

                <ListItemButton component={Link} to={link.to}>

                    <ListItemText primary={link.text} />

                </ListItemButton>

            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default Navigation;
