// import fetch users action
import { FETCH_WEB_MODE } from '../actions';

export default function (state = {}, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_WEB_MODE:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
