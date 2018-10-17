export const FETCH_R360 = 'fetch_r360';

export const fetchR360 = (data) => async(dispatch) => {
    console.log('test yeah');
    const res = data;
    console.log(res);
    dispatch({
      type: FETCH_R360,
      payload: res
    });
};
