import {saveQuestionAnswer} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
};

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleAnswerQuestion(authedUser, qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    dispatch(answerQuestion(authedUser, qid, answer));

    return saveQuestionAnswer(authedUser, qid, answer)
    .then(() => dispatch(hideLoading()))
    .catch((e) => {
      console.warn('Error in handleAnswerQuestion', e);
      // dispatch(receieveQuestions());
      alert('There was an error answering the question.');
    });
    
  }
}
