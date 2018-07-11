// import fetch users action
import { FETCH_ACTIVE_HERO_ICON } from '../actions';

export default function(state = "none", action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_ACTIVE_HERO_ICON:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	};
}