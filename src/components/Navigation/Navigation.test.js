import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../../reducers';
import middleware from '../../middleware';
// import App from './App';
import { createStore } from 'redux';
import Navigation from './Navigation';
import { setAuthedUser} from '../../actions/authedUser';
import { receiveQuestions } from '../../actions/questions';
import { receiveUsers } from '../../actions/users';
import {
    MemoryRouter
  } from "react-router-dom";
import { getInitialData } from "../../utils/api";
import { act } from "react-dom/test-utils";
import Leaderboard from '../Leaderboard';
jest.mock('../Leaderboard', () => jest.fn());

const store = createStore(reducer, middleware);

describe('Navigation', () => {

    beforeAll( async () => {
        await getInitialData()
            .then((data) => act(() => {
                store.dispatch(receiveQuestions(data.questions));
                store.dispatch(receiveUsers(data.users));
                store.dispatch(setAuthedUser('sarahedo'));
            }))
    })

    it('Will route to leaderboard', async () => {

        Leaderboard.mockImplementation(() => <div>Leaderboard</div>);

        const component = render (
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation/>
                </MemoryRouter>
            </Provider>
        )
        
        const openNav = component.getByTestId('open-nav');
        await fireEvent.click(openNav)

        const navItem = component.getByTestId('link-1');
        await fireEvent.click(navItem);

        expect(screen.getByText('Leaderboard')).toBeInTheDocument();

    });
        
});