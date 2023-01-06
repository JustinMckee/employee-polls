export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
};

export function updateUserAnswers(authedUser, qid, answer) {
  console.log('ANSWER',answer)
  return {
    type: UPDATE_USER_ANSWERS,
    authedUser,
    qid,
    answer,
  }
}