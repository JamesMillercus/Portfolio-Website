export const FETCH_HERO_TEXT = 'fetch_hero_text';

export const fetchHeroText = (data) => async(dispatch) => {
    const res = data;
    dispatch({
      type: FETCH_HERO_TEXT,
      payload: res
    });
};
