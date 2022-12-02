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

      <Container>
        {
          props.loading === false && (
            <Login />
          )
        }
        {
          props.loading === true && (
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/Leaderboard" element={<Leaderboard />} />
              <Route path="/new" element={<Create />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )
        }
      </Container>
    </div>
  );
}

const mapStateToProps = ({authedUser, users}) => (
  {
    loading: authedUser !== null
  }
)

export default connect(mapStateToProps)(App);
