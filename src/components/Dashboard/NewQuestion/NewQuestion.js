import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './NewQuestion.scss';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const NewQuestion = ({questions,question,users}) => {

  return (
    <ListItemButton
      component={Link}
      to={`/questions/${question.id}`}
      state={{
        question,
        author: users[questions[question.id].author],
      }}
      >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={users[questions[question.id].author].avatarURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <h1 style={{margin: '0 0 .3em', fontSize: '1.3em'}}>Would you rather&hellip;</h1>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.light"
              >
              By {users[questions[question.id].author].name}
            </Typography>
            &nbsp;&mdash;&nbsp;{questions[question.id].optionOne['text'] +" OR "+ questions[question.id].optionTwo['text']}
          </>

        }
        />
    </ListItemButton>

  )
}

const mapStateToProps = ({questions, users}) => (
  {
    questions,
    users
  }
)

export default connect(mapStateToProps)(NewQuestion);
