export const FETCH_SCROLLED_ITEM = 'fetch_scrolled_item';

export const fetchScrolledItem = (item) => async(dispatch) => {
    const res = item;
    dispatch({
      type: FETCH_SCROLLED_ITEM,
      payload: res
    });
};
