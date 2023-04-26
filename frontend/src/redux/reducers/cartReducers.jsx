const initialState = {
  cartItems: [],
  totalAmount: 0,
  cartIsValid: true,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;

      if (state.cartItems.length + newItem.quantity > 20) {
        return {
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          cartIsValid: false,
        };
      }
      const updatedTotalAmount =
        state.totalAmount + newItem.price * newItem.quantity;
      // return updated state
      return {
        cartItems: state.cartItems.concat(action.payload),
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    }
    case "UPDATE_CART_ITEM": {
      const newItem = action.payload;
      // checking item already exist or not in the cart behalf of it add item in cart
      const existingCartItmeIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.cartItems[existingCartItmeIndex];

      if (state.cartItems.length + newItem.quantity > 20) {
        return {
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          cartIsValid: false,
        };
      }
      // updating the total amount however it exist or not in cart
      let totAmount = state.totalAmount;
      if (existingCartItem) {
        const existingCartItemQunatity = state.cartItems.filter(
          (item) => item.id === newItem.id
        ).length;
        totAmount =
          state.totalAmount - existingCartItem.price * existingCartItemQunatity;
      }
      const updatedTotalAmount = totAmount + newItem.price * newItem.quantity;

      // should output an array of 10 items, each with quantity of 1
      let newCartItems;
      const cartItems = Array(newItem.quantity)
        .fill(newItem)
        .map((item) => {
          return {
            ...item,
            quantity: 1,
          };
        });
      if (existingCartItem) {
        const cartItemsFiltered = state.cartItems.filter(
          (el) => el.name !== newItem.name
        );
        newCartItems = cartItemsFiltered.concat(cartItems);
      } else {
        newCartItems = state.cartItems.concat(cartItems);
      }
      // return updated state
      return {
        cartItems: newCartItems,
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    }
    case "REMOVE_CART_ITEM": {
      const id = action.payload;
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.cartItems[existingCartItemIndex];
      // updating the total amount however it exist or not in cart
      const totAmount =
        state.totalAmount -
        existingItem.price *
          state.cartItems.filter((item) => item.id === id).length;

      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      return {
        cartItems: updatedCartItems,
        totalAmount: totAmount,
        cartIsValid: true,
      };
    }
    case "REMOVE_ONE_CART_ITEM": {
      const id = action.payload;
      // checking item already exist or not in the cart behalf of it add item in cart
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.cartItems[existingCartItemIndex];

      // updating the total amount however it exist or not in cart
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedCartItems;
      let cartItems = state.cartItems.filter((item) => item.id === id);
      if (cartItems.length === 1) {
        updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        updatedCartItems = state.cartItems.filter((item) => item.id !== id);
        cartItems.pop();
        updatedCartItems = updatedCartItems.concat(cartItems);
        // updatedCartItems = state.cartItems.splice(existingCartItemIndex2, 1);
      }

      return {
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    }
    case "CART_RESET": {
      return initialState;
    }
    default:
      return state;
  }
};
