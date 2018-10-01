// import fetch users action
import { FETCH_CURRENT_CHARS } from '../actions';

export default function (state = ['j', 'm'], action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_CURRENT_CHARS:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
