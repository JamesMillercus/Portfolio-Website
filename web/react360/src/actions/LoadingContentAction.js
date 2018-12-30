export const FETCH_LOADING_CONTENT = 'fetch_loading_content';

export const fetchLoadingContent = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_LOADING_CONTENT,
      payload: res
    });
};
