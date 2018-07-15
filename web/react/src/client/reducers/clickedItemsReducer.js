// import fetch users action
import { FETCH_CLICKED_ITEMS } from '../actions';

export default function (state = [], action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_CLICKED_ITEMS:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
