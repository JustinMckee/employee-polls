import {render} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../reducers';
import middleware from '../middleware';
import App from './App';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import {createStore} from 'redux';

let store;

describe('App matches snapshot', () => {

    beforeEach(async () => {
        store = await createStore(reducer, middleware);
    });
    
    it('Will match snapshot', async () => {
        
        const {component} = render(
            <Provider store={store}>
                <MemoryRouter>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
        await expect(component).toMatchSnapshot();
    });
});