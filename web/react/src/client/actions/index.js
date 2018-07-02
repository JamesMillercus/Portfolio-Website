// stored data of fetchUsers
export const BLANK = 'blank';
// action creator
export const blank = () => async (dispatch, getState, api) => {
	// once response is received from http req
	const res = null;

	// dispatch action creator
	dispatch({
		type: BLANK,
		payload: res
	});
}


// // stored data of fetchUsers
// export const FETCH_CURRENT_USER = 'fetch_current_user';
// // action creator
// export const fetchCurrentUser = () => async (dispatch, getState, api) => {
// 	// once response is received from http req
// 	const res = await api.get('/current_user');

// 	// dispatch action creator
// 	dispatch({
// 		type: FETCH_CURRENT_USER,
// 		payload: res
// 	});
// }

// // stored data of fetchUsers
// export const FETCH_ADMINS = 'fetch_admins';
// // action creator
// export const fetchAdmins = () => async (dispatch, getState, api) => {
// 	// once response is received from http req
// 	const res = await api.get('/admins');

// 	// dispatch action creator
// 	dispatch({
// 		type: FETCH_ADMINS,
// 		payload: res
// 	});
// }