export const addToCart = (payload) => {
  type: "ADD_TO_CART", payload;
};

export const removeToCart = (payload) => (dispatch) => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload,
  });
};

export const removeOneToCart = (payload) => (dispatch) => {
  dispatch({
    type: "REMOVE_ONE_CART_ITEM",
    payload,
  });
};

export const updateItemInCart = (item) => (dispatch) => {
  dispatch({
    type: "UPDATE_CART_ITEM",
    payload: { ...item, quantity: 1 },
  });
};

export const resetCart = () => (dispatch) => {
  dispatch({
    type: "CART_RESET",
  });
};
