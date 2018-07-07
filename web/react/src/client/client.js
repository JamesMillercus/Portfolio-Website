// Start up point for client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// create redux store for state, hook up middleware inside of application
import { createStore, applyMiddleware } from 'redux';
// handle asynchronous acion creators
import thunk from 'redux-thunk';
// Ties store to react components
import { Provider } from 'react-redux';
// import Routes from './Routes';
import reducers from './reducers';
// React's DOM router
import { BrowserRouter } from 'react-router-dom';
// import http async
import axios from 'axios';
// React's render router functon
import { renderRoutes } from 'react-router-config';
// import routes
import Routes from './routes/Routes';

const userAgent = window.navigator.userAgent;

// set up the redux store on the client side, with the state that has been sent from the server
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(userAgent)));
// set up event handlers onto react code that was rendered from the server
// basically allows front end js to work
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);

