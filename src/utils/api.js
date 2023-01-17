import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

// Mimic reaching out to server for authentication instead of relying on users state slice.
export function login(fields) {
  return new Promise((res) => {
    _getUsers().then((users) => {
      if (!users[fields.username]) {
        res(null);
      }
      if (users[fields.username] && users[fields.username].password === fields.password) {
        res(users[fields.username].id);
      }
    });
  });
}

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
};

export function saveQuestion (question) {
  return new Promise((res) => {
    res(_saveQuestion(question));
  })
}

export function saveQuestionAnswer (authedUser, qid, answer) {
  return _saveQuestionAnswer({authedUser, qid, answer});
}
