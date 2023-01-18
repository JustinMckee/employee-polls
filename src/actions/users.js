export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS';
export const UPDATE_USER_QUESTIONS = 'UPDATE_USER_QUESTIONS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
};

export function updateUserAnswers(authedUser, qid, answer) {
  return {
    type: UPDATE_USER_ANSWERS,
    authedUser,
    qid,
    answer,
  }
}

export function updateUserQuestions(author, qid) {
  return {
    type: UPDATE_USER_QUESTIONS,
    author,
    qid,
  }
}