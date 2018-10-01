// import fetch users action
import { FETCH_SITE_ANIMATING } from '../actions';

export default function (state = 'notAnimated', action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_SITE_ANIMATING:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
