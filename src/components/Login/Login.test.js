import {render,fireEvent, cleanup, waitFor} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux'
import reducer from '../../reducers';
import middleware from '../../middleware';
import App from '../App';
//import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { MemoryRouter } from 'react-router';
import {createStore} from 'redux';

let store;

afterEach(cleanup)

describe("Dashboard event test", () => {

  beforeEach(async () => {
    store = await createStore(reducer, middleware);
  });

  it("Will login authedUser", async () => {

    const component = render(
         
          <Provider store={store}>
            <MemoryRouter>
            <App />
            </MemoryRouter> 
          </Provider>
    );

    const username = component.getByTestId('username');
    const password = component.getByTestId('password');
    const submit = component.getByTestId('submit');
  
    fireEvent.change(username, { target: { value: "sarahedo" } });
    fireEvent.change(password, { target: { value: "password123" } });
    fireEvent.click(submit);

    await waitFor(() => expect(component.getByTestId('title')).toBeInTheDocument());

  });

});