import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cart from "./Cart/Cart";
import { Provider, useDispatch } from "react-redux";
import Header from "./Layout/Header";
import Login from "./AuthPages/login";
import Register from "./AuthPages/Register";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccess from "./UI/PaymentSuccess";
import PaymentFail from "./UI/PaymentFail";
import { login_user } from "./redux/actions/authActions";
import store from "./redux/store";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login_user());
    }
  });
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/paymentsuccess",
        element: <PaymentSuccess />,
      },
      {
        path: "/paymentfail",
        element: <PaymentFail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
