// import fetch users action
import { FETCH_USER_AGENT } from '../actions';

export default function(state = null, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_USER_AGENT:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	};
}