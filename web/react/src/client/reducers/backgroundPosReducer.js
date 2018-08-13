// import fetch users action
import { FETCH_BACKGROUND_POS } from '../actions';

export default function (state = 0, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_BACKGROUND_POS:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
