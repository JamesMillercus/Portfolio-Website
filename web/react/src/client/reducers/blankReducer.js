// import fetch users action
import { BLANK } from '../actions';

export default function(state =  null, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case false:
			// if action has data attached to it, then store the data
			return action.payload.data || false;
		default:
			// else return state
			return state;
	}
}