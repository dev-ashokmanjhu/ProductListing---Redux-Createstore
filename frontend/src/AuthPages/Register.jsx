import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { authActions } from "../store/authSlice";
import axios from "axios";
import { msg } from "../Utils/alert";
import SecondarySpiner from "../Utils/SecondarySpiner";
import { login_user } from "../redux/actions/authActions";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .matches(
          /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
          "Name can only contain Latin letters."
        )
        .required("Required"),
      password: Yup.string()
        .min(6, "Must be greater than 6")
        .max(15, "Must be 15 characters or less")
        .required("Required")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
          "Password Must Be Strong Eg. @Example123"
        ),
      confirm_password: Yup.string()
        .min(6, "Must be greater than 6")
        .max(15, "Must be 15 characters or less")
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must Match"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, actios) => {
      setIsLoading(true);
      const data = {
        name: values.Name,
        email: values.email,
        password: values.password,
      };
      const res = axios
        .post("https://e-commerce-backend-two-neon.vercel.app/register", data)
        .then((res) => {
          console.log(res);
          dispatch(login_user());
          localStorage.setItem("token", res.data.token);
          msg("Register Successfully");
          actios.resetForm();
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          msg(err?.response?.data);
          setIsLoading(false);
        });
    },
  });
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 className="heading">Register</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="Name"
              name="Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
              placeholder="Name"
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className="errorMessage">{formik.errors.Name}</div>
            ) : null}
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="E-mail"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="errorMessage">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="errorMessage">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              placeholder="Confirm Password"
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="errorMessage">
                {formik.errors.confirm_password}
              </div>
            ) : null}
          </div>
          <div>
            <button className="loginBtn" type="submit">
              {isLoading ? <SecondarySpiner /> : "Register"}
            </button>
          </div>
          <div className="signUpText">
            <p>Already Have an Account</p>
            <Link to="/login" className="registerLink">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
