// stored data of fetchUsers
export const FETCH_USER_AGENT = 'fetch_user_agent';
// action creator
export const fetchUserAgent = () => async (dispatch, getState, userAgent) => {
	// once response is received from http req
	const res = userAgent;
	dispatch({
		type: FETCH_USER_AGENT,
		payload: res
	});
}

// stored data of fetchUsers
export const FETCH_SCROLLED_ITEM = 'fetch_scrolled_item';
// action creator
export const fetchScrolledItem = (item) => async (dispatch, getState, userAgent) => {
	// once response is received from http req
	const res = item;

	dispatch({
		type: FETCH_SCROLLED_ITEM,
		payload: res
	});
}