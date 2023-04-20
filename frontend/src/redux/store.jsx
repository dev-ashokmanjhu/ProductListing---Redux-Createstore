import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import { authReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const middleware = [thunk];
const composeEnacher = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  reducer,
  composeEnacher(applyMiddleware(...middleware))
);

export default store;
