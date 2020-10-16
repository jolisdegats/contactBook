import {
  SET_LOADING,
  GET_USERS,
  GET_UNIQUE_USER,
} from "../actions/users-action";

const initialState = {
  loading: false,
  users: [],
  uniqueUser: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case GET_USERS:
      return { ...state, users: payload, loading: false };

    case GET_UNIQUE_USER:
      return { ...state, uniqueUser: payload, loading: false };

    default:
      return state;
  }
};
