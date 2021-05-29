import {
  FETCH_HOSPITALS_REQUEST,
  FETCH_HOSPITALS_SUCCESS,
  FETCH_HOSPITALS_FAILURE,
} from "./hospitalTypes";

const initialState = {
  loading: false,
  hospitals: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOSPITALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOSPITALS_SUCCESS:
      return {
        loading: false,
        hospitals: action.payload,
        error: "",
      };
    case FETCH_HOSPITALS_FAILURE:
      return {
        loading: false,
        hospitals: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
