import { saveQuestionAnswer } from "../utils/api";
import {updateUserAnswers} from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
// export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleAnswerQuestion(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer));
    dispatch(updateUserAnswers(authedUser,qid,answer));
    return saveQuestionAnswer(authedUser, qid, answer).catch((e) => {
      console.warn('Error in handleAnswerQuestion', e);
      // dispatch(receieveQuestions());
      alert('There was an error answering the question.');
    })

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
