const DEFAULT_STATE = {
  version: "0.0.0",
};

export const appActions = {
  UPDATE_CURRENT_VERSION: "UPDATE_CURRENT_VERSION",
};

export const appReducer = (state = DEFAULT_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case appActions.UPDATE_CURRENT_VERSION:
      return {
        ...state,
        version: param,
      };

    default:
      return state;
  }
};
