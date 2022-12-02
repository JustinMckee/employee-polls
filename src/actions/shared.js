import {getInitialData} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {receiveUsers} from './users';
import {receiveQuestions} from './questions';
import {receiveAuthedUser} from './authedUser';

export function handleInitialData() {
  return (dispatch) => {

    dispatch(showLoading());

    return getInitialData().then(({users,questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(receiveAuthedUser());
      dispatch(hideLoading());
    })
  }
}
