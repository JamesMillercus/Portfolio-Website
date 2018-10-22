export const FETCH_ITEM_SCROLLED = 'fetch_item_scrolled';

export const fetchItemScrolled = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_ITEM_SCROLLED,
      payload: res
    });
};
