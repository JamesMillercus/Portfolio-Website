// stored data of fetchUsers
export const FETCH_USERS = 'fetch_users';
// action creator
export const fetchUsers = () => async (dispatch, getState, api) => {
	// once response is received from http req
	const res = await api.get('/users');

	// dispatch action creator
	dispatch({
		type: FETCH_USERS,
		payload: res
	});
}


// stored data of fetchUsers
export const FETCH_CURRENT_USER = 'fetch_current_user';
// action creator
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
	// once response is received from http req
	const res = await api.get('/current_user');

	// dispatch action creator
	dispatch({
		type: FETCH_CURRENT_USER,
		payload: res
	});
}

// stored data of fetchUsers
export const FETCH_ADMINS = 'fetch_admins';
// action creator
export const fetchAdmins = () => async (dispatch, getState, api) => {
	// once response is received from http req
	const res = await api.get('/admins');

	// dispatch action creator
	dispatch({
		type: FETCH_ADMINS,
		payload: res
	});
}