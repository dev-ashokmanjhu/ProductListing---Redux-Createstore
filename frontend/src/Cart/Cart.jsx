import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { msg } from "../Utils/alert";
import { useState } from "react";
import SecondarySpiner from "../Utils/SecondarySpiner";
import {
  addToCart,
  removeOneToCart,
  removeToCart,
  resetCart,
} from "../redux/actions/cartActions";

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);

  const cartRedux = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  // making total amount to last two decimal numbers
  const totalAmount = `$${cartRedux.totalAmount.toFixed(2)}`;
  const numberOfCartItems = cartRedux.cartItems.length;

  const reducedCartItems = Object.values(
    cartRedux.cartItems.reduce((acc, { id, name, quantity, price, image }) => {
      if (!acc[name]) {
        acc[name] = { id, name, quantity: 1, price, image };
      } else {
        acc[name].quantity += 1;
      }
      return acc;
    }, {})
  );

  //checking cart is empty or not
  const hasItems = cartRedux.cartItems.length > 0;
  // function for removing item which get id as argument and redirect to cotext action
  const cartItemRemoveHandler = (id) => {
    dispatch(removeOneToCart(id));
  };
  const removeCartItemHandler = (id) => {
    dispatch(removeToCart(id));
    msg("Removed item From Cart");
  };
  // function for adding Item which get item as argument and redirect to addItem context action and only increase 1 quantity
  const cartItemAddHandler = (item) => {
    dispatch(addToCart(item));
  };
  // function for reset Item which set state to defaultstate
  const resetItemsHandler = () => {
    dispatch(resetCart());
    msg("Reset Cart Successfully");
  };
  const orderHandler = async () => {
    setIsCheckout(true);
    if (!isAuthenticated) {
      msg("Please Login/Register First");
      navigate("/login");
      return;
    }
    await fetch("https://shopping-cart-stripe-context.vercel.app/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartRedux.cartItems }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
        setIsCheckout(false);
      })
      .catch((err) => {
        console.log(err);
        setIsCheckout(false);
      });
  };

  // get items from context and map over them to show in cart and cartItem components
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {reducedCartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          img={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemoveFromCart={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  // wrap it in Modal for making overlay
  return (
    <div className={classes.cartContainer}>
      {numberOfCartItems === 0 ? (
        <h1 className={classes.cartEmpty}>Cart is Empty!!</h1>
      ) : (
        cartItems
      )}
      <div className={classes.box2}>
        <div className={classes.total}>
          <span>Total Amount :</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          {!(numberOfCartItems === 0) && (
            <button
              className={classes["button--alt"]}
              onClick={resetItemsHandler}
            >
              Reset
            </button>
          )}
          {numberOfCartItems === 0 && (
            <Link to="/">
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Add Some Items
              </button>
            </Link>
          )}
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              {isCheckout ? <SecondarySpiner /> : "Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
