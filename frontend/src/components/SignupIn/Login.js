import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import AuthService  from "../../services/auth.service";

export const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email : "",
    password : "",
  });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationHandler = () => {
    if (!user.email || !user.password) {
      setSuccessful(false);
      setMessage('This field is required!');
      return false;
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)){
      setSuccessful(false);
      setMessage("Please enter valid email.");
      return false;
    }
    if (user.password.length < 6 || user.password.length > 40) {
      setSuccessful(false);
      setMessage("The password must be between 6 and 40 characters.");
      return false;
    }
    return true;
  }

  const onChangeHandler = (e) => {
    const {name, value} = e.target; 
    setUser({
      ...user,
      [name] : value
    })
  }

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    var formIsValid = validationHandler();
    if(formIsValid){
      AuthService.login(user).then(
        (response) => {
          navigate("/profile"); 
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

return (  
    <div className="container mt-3">
    <h1 className="pageheading">Login</h1>

      <form onSubmit={loginSubmitHandler}>
      {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={onChangeHandler}
            value={user.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onChangeHandler}
            value={user.password}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block loginbutton">
            <span>Login</span>
          </button>
        </div>
      </form>
      </div>
);
}
