export const FETCH_LOADING_PROGRESS = 'fetch_loading_progress';

export const fetchLoadingProgress = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_LOADING_PROGRESS,
      payload: res
    });
};
