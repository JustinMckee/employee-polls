import { saveQuestionAnswer } from "../utils/api";
import { saveQuestion } from '../utils/api';
import {updateUserAnswers, updateUserQuestions} from './users';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

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

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion(question)
      .then((res) => {
        dispatch(addQuestion(res))
        dispatch(updateUserQuestions(res.author,res.qid))
        dispatch(hideLoading())
      })
      .catch((e) => {
        dispatch(hideLoading());
        console.warn('Error in handleAddQuestion', e);
      })
    }
    
    // .then((question) => {
    //   console.log(question);
    // }) 
    // .catch((e) => {console.log(e)})
  }

