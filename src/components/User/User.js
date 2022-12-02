import {connect} from 'react-redux';

// Design system
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const User = ({authedUser}) => {

  if (authedUser) {
    return (
      <Stack direction="row" spacing={1} >
        <Chip
          avatar={<Avatar src="https://i.pravatar.cc/100?img=5"/>}
          label={authedUser}
          variant="outlined"
          />
      </Stack>
    )
  }



}

const mapStateToProps = ({users, authedUser}) => ({
  authedUser,
  users
});

export default connect(mapStateToProps)(User);
