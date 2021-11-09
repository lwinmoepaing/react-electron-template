const DEFAULT_USER_STATE = {
  data: null,
  token: null,
};

export const profileActions = {
  UPDATE_PROFILE: "UPDATE_PROFILE",
  LOGOUT_PROFILE: "LOGOUT_PROFILE",
  UPDATE_TOKEN: "UPDATE_TOKEN",
};

export const profileReducer = (state = DEFAULT_USER_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case profileActions.UPDATE_PROFILE:
      return {
        ...state,
        data: param,
      };

    case profileActions.UPDATE_TOKEN:
      return {
        ...state,
        token: param,
      };
    case profileActions.LOGOUT_PROFILE:
      return {
        data: null,
        token: null,
      };

    default:
      return state;
  }
};
