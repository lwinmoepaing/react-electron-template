const DEFAULT_STATE = "en";

export const languageActions = {
  UPDATE_LANGUAGE: "UPDATE_LANGUAGE",
};

export const languageReducer = (state = DEFAULT_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case languageActions.UPDATE_LANGUAGE:
      return param;

    default:
      return state;
  }
};
