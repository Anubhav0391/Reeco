import { REQUEST, SUCCESS, UPDATE } from "./actionTypes";

const initialState = {
  loading: false,
  data: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, loading: false, data: payload };
    case UPDATE:
      return { ...state, data: payload };
    default:
      return state;
  }
};
