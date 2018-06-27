import { createStore, applyMiddleware } from 'redux';
// handle asynchronous acion creators
import thunk from 'redux-thunk';
import axios from 'axios';
// import reducers from client
import reducers from '../../client/reducers';

export default req => {
	const axiosInstance = axios.create({
		baseURL: 'http://react-ssr-api.herokuapp.com',
		headers: { cookie: req.get('cookie') || '' }
	});

	// create store with imported data from reducers and an empty state
	const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
	return store;
};