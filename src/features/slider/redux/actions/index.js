const actionTypes = {
  LOAD_SLIDER_EVENTS: 'wjbets/sliderEvents/LOAD_SLIDER_EVENTS',
  CHANGE_SLIDER: 'wjbets/sliderEvents/CHANGE_SLIDER',
  LOAD_SLIDER_EVENTS_SUCCESS: 'wjbets/sliderEvents/LOAD_SLIDER_EVENTS_SUCCESS',
  LOAD_SLIDER_EVENTS_FAILURE: 'wjbets/sliderEvents/LOAD_SLIDER_EVENTS_FAILURE',
  CLEAR_SLIDER_DATA: 'wjbets/sliderEvents/CLEAR_SLIDER_DATA',
};

const loadSlider = lang => {
  return async (dispatch, getState, extra) => {
    if (!getState().slider.sliderLoading) {
      dispatch({ type: actionTypes.LOAD_SLIDER_EVENTS });
      const { api } = extra;
      const response = await api.media.loadSlider(lang);
      if (response.success) {
        dispatch({ type: actionTypes.LOAD_SLIDER_EVENTS_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: actionTypes.LOAD_SLIDER_EVENTS_FAILURE, payload: response.errorMessage });
      }
    }
  };
};

const clearSliderData = () => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CLEAR_SLIDER_DATA });
  };
};

const changeSlider = number => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_SLIDER, payload: number });
  };
};

export { actionTypes, loadSlider, changeSlider, clearSliderData };
