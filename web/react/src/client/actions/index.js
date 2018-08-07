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
};

// stored data of scrolled items
export const FETCH_SCROLLED_ITEM = 'fetch_scrolled_item';
// action creator
export const fetchScrolledItem = (item) => async (dispatch) => {
	// once response is received from http req
	const res = item;

	dispatch({
		type: FETCH_SCROLLED_ITEM,
		payload: res
	});
};

// stored data of active items
export const FETCH_ACTIVE_ITEM = 'fetch_active_item';
// action creator
export const fetchActiveItem = (item) => async (dispatch) => {
	// once response is received from http req
	const res = item;

	dispatch({
		type: FETCH_ACTIVE_ITEM,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_CLICKED_ITEMS = 'fetch_clicked_items';
const clickedItems = [];
// action creator
export const fetchClickedItems = (item) => async (dispatch) => {
	// once response is received from http req
	clickedItems.push(item);
	// console.log(clickedItems);
	const res = clickedItems;

	dispatch({
		type: FETCH_CLICKED_ITEMS,
		payload: res
	});
};


// stored data of clicked items
export const FETCH_ACTIVE_HERO_ICON = 'fetch_active_hero_icon';
// action creator
export const fetchActiveHeroIcon = (activeHeroIcon) => async (dispatch) => {
	const res = activeHeroIcon;

	dispatch({
		type: FETCH_ACTIVE_HERO_ICON,
		payload: res
	});
};


// stored data of clicked items
export const FETCH_DEVICE_TYPE = 'fetch_device_type';
// action creator
export const fetchDeviceType = (deviceType) => async (dispatch) => {
	const res = deviceType;

	dispatch({
		type: FETCH_DEVICE_TYPE,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_HERO_TEXT_ANIMATION = 'fetch_hero_text_animation';
// action creator
export const fetchHeroTextAnimation = (allowed) => async (dispatch) => {
	const res = allowed || false;

	dispatch({
		type: FETCH_HERO_TEXT_ANIMATION,
		payload: res
	});
};
