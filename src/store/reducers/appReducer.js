const DEFAULT_STATE = {
  version: "0.0.0",
  isOpenDrawer: true,
};

export const appActions = {
  UPDATE_CURRENT_VERSION: "UPDATE_CURRENT_VERSION",
  TOGGLE_DRAWER: "TOGGLE_DRAWER",
};

export const appReducer = (state = DEFAULT_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case appActions.UPDATE_CURRENT_VERSION:
      return {
        ...state,
        version: param,
      };

    case appActions.TOGGLE_DRAWER:
      return {
        ...state,
        isOpenDrawer: !state.isOpenDrawer,
      };

    default:
      return state;
  }
};
