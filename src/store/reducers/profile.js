const DEFAULT_USER_STATE = {
  data: null,
};

export const profileActions = {
  UPDATE_PROFILE: "UPDATE_PROFILE",
  LOGOUT_PROFILE: "LOGOUT_PROFILE",
};

export const profileReducer = (state = DEFAULT_USER_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case profileActions.UPDATE_PROFILE:
      return {
        data: param,
      };
    case profileActions.LOGOUT_PROFILE:
      return {
        data: null,
      };

    default:
      return state;
  }
};
