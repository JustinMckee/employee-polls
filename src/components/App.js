import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import './App.scss';

// Design System
import LoadingBar from 'react-redux-loading-bar';
import Container from '@mui/material/Container';

// My Components
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Create from './Create';
import Login from './Login';
import Question from './Question';
import NotFound from './NotFound';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());
  },[props]);

  return (
    <div className="App">

      <LoadingBar />

      <header className="App-header">
        <Navigation />
      </header>
        {
          !props.authedUser && (
            <Container>
              <Routes>
                <Route path="*" state={props} element={<Login />} />
              </Routes>
            </Container>
          )
        }
        {
          props.authedUser && (
            <Container>
              <Routes>
                <Route path="*" state={props} element={<NotFound />} />
                <Route path="/" state={props} exact element={<Dashboard />} />
                <Route path="/Leaderboard" exact element={<Leaderboard />} />
                <Route path="/questions/:id" element={<Question/>} />
                <Route path="/add" exact element={<Create />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Container>
          )
        }
    </div>
  );
}

const mapStateToProps = ({authedUser, users}) => (
  {
    loading: authedUser !== null,
    authedUser
  }
)

export default connect(mapStateToProps)(App);
