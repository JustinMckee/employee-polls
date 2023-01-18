import {connect} from 'react-redux';

import Percentage from '../../Percentage';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Answered = ({answer,users}) => {

  const theDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  } 

  return (
    <>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={users[answer.author].avatarURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <h1 style={{margin: '0 0 .2em', fontSize: '1.1em'}}>Would you rather&hellip;</h1>
        }
        disableTypography={true}
        secondary={
          <>
            <Typography
            sx={{ display: 'block', marginBottom: '.1em', color:'#a9a9a9',fontSize:'.8em'}}
            component="span"
            variant="body2"
            >
            {theDate(answer.timestamp)}
          </Typography>
            <Typography
              sx={{ display: 'inline', fontSize:'.8em', }}
              component="span"
              variant="body2"
              color="text.light"
              >
              By {users[answer.author].name}
            </Typography>
            
            <div style={{
              width: '100%',
              margin: '1.5em 0',
              }}>
              <Typography
                sx={{ display: 'block',fontWeight:'bold' }}
                component="span"
                variant="body1"
                color="text.primary"
                >
                  {answer.optionOne['text'].charAt(0).toUpperCase() + answer.optionOne['text'].slice(1)}
              </Typography>

              <Percentage 
                qid={answer.id} 
                option='optionOne'
                />
              
              <Typography
                sx={{ display: 'block',fontWeight:'bold' }}
                component="span"
                variant="body1"
                color="text.primary"
                >
                   {answer.optionTwo['text'].charAt(0).toUpperCase() + answer.optionTwo['text'].slice(1)}
              </Typography>
              <Percentage 
                qid={answer.id}
                option='optionTwo'
                />
            </div>
          </>
        }
        />
       
    </>
  )
}

const mapStateToProps = ({users}) => (
  {
    users
  }
)
export default connect(mapStateToProps)(Answered);
