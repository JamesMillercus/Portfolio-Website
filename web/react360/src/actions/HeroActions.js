export const FETCH_HERO = 'fetch_hero';

export const fetchHero = (data) => async(dispatch) => {
    console.log('test yeah');
    const res = data;
    console.log(res);
    dispatch({
      type: FETCH_HERO,
      payload: res
    });
};
