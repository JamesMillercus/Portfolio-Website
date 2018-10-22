export const FETCH_ITEM_CLICKED = 'fetch_item_clicked';

const clickedItems = {};

export const fetchItemClicked = (page, item) => async(dispatch) => {
    // const res = data;

    // once response is received from http req
    if (!clickedItems[page]) clickedItems[page] = [];
    clickedItems[page].push(item);

    const res = clickedItems;

    dispatch({
      type: FETCH_ITEM_CLICKED,
      payload: res
    });
};
