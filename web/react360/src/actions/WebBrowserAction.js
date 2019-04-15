export const FETCH_WEB_BROWSER = 'fetch_web_browser';

export const fetchWebBrowser = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_WEB_BROWSER,
      payload: res
    });
};
