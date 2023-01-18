import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './NewQuestion.scss';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const NewQuestion = ({questions,question,users}) => {

  const theDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  } 

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
          <h1 style={{margin: '0', fontSize: '1.1em'}}>Would you rather&hellip;</h1>
        }
        secondary={
          <>
            <Typography
            sx={{ display: 'block', marginBottom: '.1em', color:'#a9a9a9',fontSize:'.8em'}}
            component="span"
            variant="body2"
            color="text.light"
            >
            {theDate(question.timestamp)}
          </Typography>
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
