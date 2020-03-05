import initialState from '../initial';
import { actionTypes } from '../actions';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SLIDER_EVENTS:
      return {
        ...state,
        slides: [],
        sliderLoading: true,
      };

    case actionTypes.CHANGE_SLIDER:
      return {
        ...state,
        currentSlide: action.payload,
      };

    case actionTypes.LOAD_SLIDER_EVENTS_SUCCESS:
      return {
        ...state,
        slides: action.payload,
        sliderLoading: false,
        initialSlides: action.payload,
      };

    case actionTypes.LOAD_SLIDER_EVENTS_FAILURE:
      return {
        ...state,
        slides: [],
        sliderLoading: false,
      };

    case actionTypes.CLEAR_SLIDER_DATA:
      return {
        ...state,
        currentSlide: 0,

      };

    default:
      return { ...state };

  }
}

export default reducer;
