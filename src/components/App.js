import './App.scss';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());
  },[props]);

  return (
    <div className="App">
      <LoadingBar />
      <header className="App-header">
        <p>
          Open your DevTools <code>console</code> to see what our Redux middleware is logging for actions and state.
        </p>
      </header>
    </div>
  );
}

const mapStateToProps = ({authedUser}) => (
  {
    loading: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
