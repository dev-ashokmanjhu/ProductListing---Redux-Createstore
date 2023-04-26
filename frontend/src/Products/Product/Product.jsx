import ProductForm from "./ProductForm";
import classes from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { msg } from "../../Utils/alert";
import { updateItemInCart } from "../../redux/actions/cartActions";

const Product = (props) => {
  const dispatch = useDispatch();
  // getting data from redux store
  const cartRedux = useSelector((state) => state.cart);
  const numberOfCartItems = cartRedux.cartItems.length;
  // fixed price for two decimal numbers
  const price = `$${props.price.toFixed(2)}`;
  // function for adding item to redux store
  const productQty = cartRedux.cartItems.filter(
    (item) => item.id === props.id
  ).length;

  // it get item quantity from function props and send data of props product to redux store
  const addToCartHandler = (quantity) => {
    dispatch(updateItemInCart(props, quantity));

    if (!(numberOfCartItems + quantity > 20)) {
      msg(`Add ${quantity} Item to Cart`);
    } else {
      msg("Cart Limit Exceed");
    }
  };

  return (
    <li className={classes.products}>
      <div>
        <img src={props.img} alt="image" />
        <h3>{props.name}</h3>
        <div className={classes.description}>
          {props.description.slice(0, 50)}...
        </div>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div>
        <ProductForm
          id={props.id}
          cartQuantity={cartRedux.cartItems ? productQty : ""}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
};

export default Product;
