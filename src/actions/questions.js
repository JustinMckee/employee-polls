export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
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
