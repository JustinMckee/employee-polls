import {render,waitFor} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../../reducers';
import middleware from '../../middleware';
// import App from './App';
import {createStore} from 'redux';
import Dashboard from './Dashboard';
import {handleSetAuthedUser} from '../../actions/authedUser';

describe('Dashboard', () => {

    let store;
    let logged;
    const dispatch = jest.fn();

    beforeAll(async () => {
        store = await createStore(reducer, middleware);
        logged = await dispatch(handleSetAuthedUser({
            username: 'sarahedo',
            password: 'password123',
        }));
    });
    
    it('Will render a list', async () => {
        
        const {component} = render(
                <Provider store={store}>
                    <Dashboard />
                </Provider>
            );

    
       await waitFor(() => expect(component.getByTestId('title')).toBeTruthy());
        
    });
});