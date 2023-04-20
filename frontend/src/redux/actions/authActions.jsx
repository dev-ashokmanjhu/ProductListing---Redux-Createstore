export const login_user = (payload) => (dispatch) => {
  dispatch({
    type: "LOGIN_USER",
    payload,
  });
};
export const logout_user = (payload) => (dispatch) => {
  dispatch({
    type: "LOGOUT_USER",
    payload,
  });
};
