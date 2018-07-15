import { createStore, applyMiddleware } from 'redux';
// handle asynchronous acion creators
import thunk from 'redux-thunk';
// import reducers from client
import reducers from '../../client/reducers';

export default req => {
	const userAgent = req.headers['user-agent'];
	// create store with imported data from reducers and an empty state
	const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(userAgent)));
	return store;
};
