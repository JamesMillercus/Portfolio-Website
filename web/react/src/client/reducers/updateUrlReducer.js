// import fetch users action
import { FETCH_UPDATE_URL } from '../actions';

export default function (state = null, action) {
	// console.log(action.payload);
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_UPDATE_URL:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
