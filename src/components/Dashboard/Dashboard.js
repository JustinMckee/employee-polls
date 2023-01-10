import {useState} from 'react';
import {connect} from 'react-redux';

// Design system
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

// My components
import NewQuestion from './NewQuestion';
import Answered from './Answered';

const Dashboard = ({users,questions,authedUser}) => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newQuestions = Object.keys(questions)
    .filter((q) => {
      return !(q in users[authedUser].answers);
    }).length;

  const answeredQuestions = users[authedUser].answers.length;

  return (
    <div>
      <h1>Polls by {users[authedUser].name}</h1>
      <Avatar
        alt={users[authedUser].name}
        src={users[authedUser].avatarURL}
        sx={{width:100,height:100}}
        />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="New Questions" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>

            {newQuestions === 0 && (
              'You have no polls to answer.'
            )}

            <List sx={{ width: '100%' }}>
              {
                Object.values(questions)
                .filter((q) => {
                  return !(q.id in users[authedUser].answers);
                })
                .sort((a,b) => {
                  if(a.timestamp > b.timestamp) {
                    return -1
                  }
                  if(a.timestamp < b.timestamp){
                    return 1
                  }
                  return 0;
                })
                .map((q, index) => (
                  <>
                    <ListItem alignItems="flex-start" id={q.id} key={q.id}>
                      <NewQuestion question={q} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              }
            </List>
          </TabPanel>

          <TabPanel value={value} index={1}>

            {answeredQuestions === 0 && (
                'You have no history to display.'
              )}

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                Object.keys(users[authedUser].answers)
                .sort((a,b) => {
                  if(questions[a].timestamp > questions[b].timestamp) {
                    return -1
                  }
                  if(questions[a].timestamp < questions[b].timestamp){
                    return 1
                  }
                  return 0;
                })
                .map((a, index) => (
                  <>
                    <ListItem alignItems="flex-start" id={a} key={a}>
                      <Answered answer={questions[a]} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              }
            </List>
          </TabPanel>

        </Box>
    </div>
  )
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const mapStateToProps = ({authedUser,questions,users}) => (
  {
    loading: authedUser !== null,
    authedUser,
    questions,
    users
  }
)

export default connect(mapStateToProps)(Dashboard);
