// import fetch users action
import { FETCH_HERO_KEYPRESS } from '../actions';

export default function (state = false, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_HERO_KEYPRESS:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
