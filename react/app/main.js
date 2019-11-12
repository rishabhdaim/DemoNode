import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers/reducers'

let store = createStore(todoApp);

ReactDOM.render(
    <Provider store = {store}>
        <App headerProp = "Header from props..." contentProp = "Content from props..."/>
    </Provider>, document.getElementById('app'));

// setTimeout(() => {ReactDOM.unmountComponentAtNode(document.getElementById('app'));}, 10000);