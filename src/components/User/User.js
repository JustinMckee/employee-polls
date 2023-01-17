import {useState} from 'react';
import {connect} from 'react-redux';
import {removeAuthedUser} from '../../actions/authedUser';
import { useNavigate } from "react-router-dom";

// Design system
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const User = ({dispatch,authedUser,users}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logging out!');
    dispatch(removeAuthedUser())
  }

  if (authedUser) {
    return (
      <Stack direction="row" spacing={1} >
        <Chip
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          data-testid="usernav"
          avatar={<Avatar src={ users[authedUser].avatarURL ?? null}/>}
          label={authedUser}
          variant="outlined"
          deleteIcon={<KeyboardArrowDownIcon />}
          onDelete={handleClick}
          />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          >
          <MenuItem id="1" to={'/test'} onClick={() => (navigate('/'))}>Dashboard</MenuItem>
          <MenuItem id="2" onClick={handleLogout} data-testid="logout">Logout</MenuItem>
        </Menu>
      </Stack>
    )
  }



}

const mapStateToProps = ({users, authedUser}) => ({
  authedUser,
  users
});

export default connect(mapStateToProps)(User);
