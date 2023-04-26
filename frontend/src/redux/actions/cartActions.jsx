export const addToCart = (item) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: { ...item, quantity: 1 },
  });
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

export const updateItemInCart = (props, quantity) => (dispatch) => {
  dispatch({
    type: "UPDATE_CART_ITEM",
    payload: {
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price,
      image: props.img,
    },
  });
};

export const resetCart = () => (dispatch) => {
  dispatch({
    type: "CART_RESET",
  });
};
