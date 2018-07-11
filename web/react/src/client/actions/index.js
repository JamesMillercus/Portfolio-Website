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

// stored data of scrolled items
export const FETCH_SCROLLED_ITEM = 'fetch_scrolled_item';
// action creator
export const fetchScrolledItem = (item) => async (dispatch, getState) => {
	// once response is received from http req
	const res = item;

	dispatch({
		type: FETCH_SCROLLED_ITEM,
		payload: res
	});
}

// stored data of active items
export const FETCH_ACTIVE_ITEM = 'fetch_active_item';
// action creator
export const fetchActiveItem = (item) => async (dispatch, getState) => {
	// once response is received from http req
	const res = item;

	dispatch({
		type: FETCH_ACTIVE_ITEM,
		payload: res
	});
}

// stored data of clicked items
export const FETCH_CLICKED_ITEMS = 'fetch_clicked_items';
let clickedItems = [];
// action creator
export const fetchClickedItems = (item) => async (dispatch, getState) => {
	// once response is received from http req
	clickedItems.push(item);
	// console.log(clickedItems);
	const res = clickedItems;

	dispatch({
		type: FETCH_CLICKED_ITEMS,
		payload: res
	});
}


// stored data of clicked items
export const FETCH_ACTIVE_HERO_ICON = 'fetch_active_hero_icon';
// action creator
export const fetchActiveHeroIcon = (activeHeroIcon) => async (dispatch, getState) => {
	const res = activeHeroIcon;

	dispatch({
		type: FETCH_ACTIVE_HERO_ICON,
		payload: res
	});
}