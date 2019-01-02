export const FETCH_WEB_MODE = 'fetch_web_mode';

export const fetchWebMode = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_WEB_MODE,
      payload: res
    });
};
