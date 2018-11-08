// import fetch users action
import { FETCH_DEVICE_TYPE } from '../actions';

export default function (state = null, action) {
	// if actions.type
	switch (action.type) {
		//if actions.type is FETCH_USERS
		case FETCH_DEVICE_TYPE:
			// if action has data attached to it, then store the data
			return action.payload;
		default:
			// else return state
			return state;
	}
}
