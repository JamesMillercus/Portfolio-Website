// import fetch users action
import { FETCH_CHAR_LOADER } from '../actions';

export default function (state = [], action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_CHAR_LOADER:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
