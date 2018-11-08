export const FETCH_HERO_HOVER = 'fetch_hero_hover';

export const fetchHeroHover = (data) => async(dispatch) => {
    const res = data;

    dispatch({
      type: FETCH_HERO_HOVER,
      payload: res
    });
};
