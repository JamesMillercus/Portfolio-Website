// import fetch users action
import { FETCH_CONTENT } from '../actions';

export default function (state = {}, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_CONTENT:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
