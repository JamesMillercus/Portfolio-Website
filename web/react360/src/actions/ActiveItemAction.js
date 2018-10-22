export const FETCH_ACTIVE_ITEM = 'fetch_active_item';

export const fetchActiveItem = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_ACTIVE_ITEM,
      payload: res
    });
};
