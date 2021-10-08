const DEFAULT_NOTI_STATE = {
  data: null,
};

export const notificationActions = {
  INCOMING_NOTI: "INCOMING_NOTI",
};

export const notificationReducer = (state = DEFAULT_NOTI_STATE, action) => {
  const { type, param } = action;

  switch (type) {
    case notificationActions.INCOMING_NOTI:
      return {
        data: param,
      };

    default:
      return state;
  }
};
