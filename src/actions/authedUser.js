import {login} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';
export const RECEIVE_AUTHED_USER = 'RECEIVE_AUTHED_USER';

export function receiveAuthedUser(id) {
  return {
    type: RECEIVE_AUTHED_USER,
    id,
  }
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
};

export function handleSetAuthedUser(fields) {
  return (dispatch) => {
    dispatch(showLoading());
    return login(fields)
    .then((id) => {
      dispatch(setAuthedUser(id))
      dispatch(hideLoading());
    });
  }
}

export function removeAuthedUser() {
  return {
    type: REMOVE_AUTHED_USER,
  }
}
