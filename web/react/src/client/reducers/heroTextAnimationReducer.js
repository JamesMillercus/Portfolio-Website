// import fetch users action
import { FETCH_HERO_TEXT_ANIMATION } from '../actions';

export default function (state = false, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_HERO_TEXT_ANIMATION:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
