//import {saveQuestion, saveQuestionAnswer} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
// export const ADD_QUESTIONS = 'ADD_QUESTIONS';
// export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

// export function addQuestion(question) {
//   return {
//     type: ADD_QUESTION,
//     question,
//   }
// }
//
// export function handleAddQuestion(question) {
//   return (dispatch, getState) => {
//     const {authedUser} = getState();
//     dispatch(showLoading());
//     return saveQuestion({
//       question,
//       author: authedUser,
//     })
//     .then((question) => dispatch(addQuestion(question)))
//     .then(() => dispatch(hideLoading()));
//   }
// }
//
// export function answerQuestion(answer) {
//   return {
//     type: ANSWER_QUESTION,
//     answer,
//   }
// }
//
// export function handleAnswerQuestion(answer) {
//   return (dispatch, getState) => {
//     dispatch(answerQuestion(answer));
//
//     return saveQuestionAnswer(answer).catch(e) => {
//       console.warn('Error in handleAnswerQuestion', e);
//       dispatch(receieveQuestions());
//       alert('There was an error answering the question.');
//     }
//   }
// }
