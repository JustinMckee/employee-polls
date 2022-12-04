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
            <List sx={{ width: '100%' }}>
              {
                Object.keys(questions)
                .filter((q) => {
                  return !(q in users[authedUser].answers);
                })
                .map((q, index) => (
                  <>
                    <ListItem alignItems="flex-start" key={index}>
                      <NewQuestion question={questions[q]} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              }
            </List>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                Object.keys(users[authedUser].answers)
                .map((a, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <Answered answered={questions[a]} />
                  </ListItem>
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
