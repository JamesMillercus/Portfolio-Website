// import fetch users action
import { FETCH_SCROLLED_ITEM } from '../actions';

export default function(state = null, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_SCROLLED_ITEM:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	};
}