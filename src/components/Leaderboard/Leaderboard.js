import {connect} from 'react-redux';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Leaderboard = ({users}) => {

  return (
    <>
      <h1>Leaderboard</h1>
      <List sx={{ width: '100%' }}>
        {
          Object.entries(users).sort((a,b) => {
            return (
              (Object.keys(a[1].answers).length + a[1].questions.length) 
              + (Object.keys(b[1].answers).length + b[1].questions.length)
              ) 
          }).map((item,index) => (
            <>
              <ListItem key={item.id} alignItems="flex-start" sx={{margin: '1em 0'}}>
                <ListItemAvatar sx={{display: 'inline-flex',marginRight:'1em'}}>
                  <Avatar sx={{ border: '1px solid #1976d2', borderStyle: 'inset solid', borderRadius: '50%', bgcolor: 'transparent', color: '#1976d2', marginRight: '.5em' }}>{index + 1}</Avatar>
                  <Avatar alt="Remy Sharp" src={item[1].avatarURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <h1 style={{margin: '0 0 .3em', fontSize: '1.3em'}}>{item[1].name}</h1>
                  }
                  secondary={
                    <Stack direction="row" spacing={1}>
                      <Chip label={Object.keys(item[1].answers).length + ' Answers'} size="small" sx={{borderColor:'#1976d2', color: '#1976d2'}} variant="outlined" />
                      <Chip label={item[1].questions.length + ' Questions'} size="small" sx={{borderColor:'#1976d2', color: '#1976d2'}} variant="outlined" />
                      <Chip label={Object.keys(item[1].answers).length + item[1].questions.length + ' Total'} sx={{bgcolor: '#1976d2',color: '#fff'}}size="small" />
                    </Stack>     
                  }/> 
              </ListItem>   
              <Divider variant="inset" component="li"/>
            </>
            ))
        }
      </List>
    </>
  )
}

const mapStateToProps = ({users}) => (
  {
    users
  }
)
export default connect(mapStateToProps)(Leaderboard);
