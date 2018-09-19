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
	const res = activeHeroIcon || 'none';

	dispatch({
		type: FETCH_ACTIVE_HERO_ICON,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_SCROLLED_HERO_ICON = 'fetch_scrolled_hero_icon';
// action creator
export const fetchScrolledHeroIcon = (scrolledHeroIcon) => async (dispatch) => {
	const res = scrolledHeroIcon;

	dispatch({
		type: FETCH_SCROLLED_HERO_ICON,
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

// stored data of clicked items
export const FETCH_BACKGROUND_POS = 'fetch_background_pos';
// action creator
export const fetchBackgroundPos = (pos) => async (dispatch) => {
	const res = pos;

	dispatch({
		type: FETCH_BACKGROUND_POS,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_CHAR_LOADER = 'fetch_char_loader';
// action creator
export const fetchCharLoader = (charArr) => async (dispatch) => {
	const res = charArr;

	dispatch({
		type: FETCH_CHAR_LOADER,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_CURRENT_CHARS = 'fetch_current_chars';

// action creator
export const fetchCurrentChars = (charArr) => async (dispatch) => {
	const res = charArr;

	dispatch({
		type: FETCH_CURRENT_CHARS,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_SITE_ANIMATING = 'fetch_site_animating';

// action creator
export const fetchSiteAnimating = (animating) => async (dispatch) => {
	const res = animating;

	dispatch({
		type: FETCH_SITE_ANIMATING,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_CURRENT_FOOTER_CHARS = 'fetch_current_footer_chars';

// action creator
export const fetchCurrentFooterChars = (charArr) => async (dispatch) => {
	const res = charArr || '';

	dispatch({
		type: FETCH_CURRENT_FOOTER_CHARS,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_BROWSER = 'fetch_browser';

// action creator
export const fetchBrowser = (browser) => async (dispatch) => {
	const res = browser;

	dispatch({
		type: FETCH_BROWSER,
		payload: res
	});
};

// stored data of clicked items
export const FETCH_CONTENT = 'fetch_content';

// action creator
export const fetchContent = (content) => async (dispatch) => {
	const res = content;
	
	dispatch({
		type: FETCH_CONTENT,
		payload: res
	});
};
