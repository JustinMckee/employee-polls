import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../../reducers';
import middleware from '../../middleware';
import { createStore } from 'redux';
import User from './User';
import { setAuthedUser} from '../../actions/authedUser';
import { receiveQuestions } from '../../actions/questions';
import { receiveUsers } from '../../actions/users';
import {
    MemoryRouter
  } from "react-router-dom";
import { getInitialData } from "../../utils/api";
import { act } from "react-dom/test-utils";



const store = createStore(reducer, middleware);
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('Logout', () => {

    beforeAll( async () => {
        await getInitialData()
            .then((data) => act(() => {
                store.dispatch(setAuthedUser('sarahedo'));
                store.dispatch(receiveUsers(data.users));
                store.dispatch(receiveQuestions(data.questions));
            }))
    })

    it('Will log the authedUser out', async () => {

        const component = render (
            <Provider store={store}>
                <MemoryRouter>
                    <User/>
                </MemoryRouter>
            </Provider>
        )

        const loggingOut = jest.spyOn(console, 'log');
        const usernav = component.getByTestId('usernav');
        await fireEvent.click(usernav);

        const logout = component.getByTestId('logout');
        await fireEvent.click(logout);

        expect(console.log).toHaveBeenCalledWith('Logging out!')
    });
        
});