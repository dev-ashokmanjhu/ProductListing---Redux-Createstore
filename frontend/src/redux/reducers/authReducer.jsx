const initialState = {
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return { isAuthenticated: true };
    }
    case "LOGOUT_USER": {
      return {
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};
