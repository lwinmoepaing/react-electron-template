const DEFAULT_USER_STATE = {
  data: null,
};

export const profileActions = {
  UPDATE_PROFILE: "UPDATE_PROFILE",
};

export const profileReducer = (state = DEFAULT_USER_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case profileActions.UPDATE_PROFILE:
      return {
        data: param,
      };

    default:
      return state;
  }
};
