export const FETCH_CLICKED_ITEMS = 'fetch_clicked_items';

const clickedItems = {};

export const fetchClickedItems = (page, item) => async(dispatch) => {
    // const res = data;

    // once response is received from http req
    if (!clickedItems[page]) clickedItems[page] = [];
    clickedItems[page].push(item);

    const res = clickedItems;

    dispatch({
      type: FETCH_CLICKED_ITEMS,
      payload: res
    });
};
