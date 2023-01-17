import { render, waitFor, screen } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../../reducers';
import middleware from '../../middleware';
// import App from './App';
import { createStore } from 'redux';
import Dashboard from './Dashboard';
import { setAuthedUser} from '../../actions/authedUser';
import { receiveQuestions } from '../../actions/questions';
import { receiveUsers } from '../../actions/users';
import {
    MemoryRouter
  } from "react-router-dom";
import { getInitialData } from "../../utils/api";
import { act } from "react-dom/test-utils";

const store = createStore(reducer, middleware);

describe('Dashboard', () => {

    beforeAll( async () => {
        await getInitialData()
            .then((data) => act(() => {
                store.dispatch(receiveQuestions(data.questions));
                store.dispatch(receiveUsers(data.users));
                store.dispatch(setAuthedUser('sarahedo'));
            }))
    })

    it('Will render a list', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId('question-list')).toBeInTheDocument()

    });
        
});