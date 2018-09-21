// import fetch users action
import { FETCH_URL_REQUEST } from '../actions';

export default function (state = '/', action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_URL_REQUEST:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
