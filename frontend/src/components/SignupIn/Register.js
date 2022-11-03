import React, { useState, useRef} from "react";
import AuthService  from "../../services/auth.service";


export const Register = () => {

  const form = useRef();
  const [user, setUser] = useState({
    username : "",
    email : "",
    password : "",
    confirmpassword : ""
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationHandler = () => {
    if (!user.username || !user.email || !user.password || !user.confirmpassword) {
      setSuccessful(false);
      setMessage('This field is required!');
      return false;
    }
    if (user.username.length < 3 || user.username.length > 20) {
      setSuccessful(false);
      // form.current.username.style.border = '1px solid #f9d7da';
      setMessage("The username must be between 3 and 20 characters.");
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
    if(user.password !== user.confirmpassword){
      setSuccessful(false);
      setMessage("password and confirm password must be same.");
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
  const registerSubmitHandler = (e) => {
    
      e.preventDefault();
      var formIsValid = validationHandler();

      if(formIsValid){
        AuthService.register(user).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
    
            //reset form after submission 
            setUser({
              username : "",
              email : "",
              password : "",
              confirmpassword : ""
            });
              },
          (error) => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message)  || error.message || error.toString();
              setMessage(resMessage);
              setSuccessful(false);
          }
        );
      }
  };

  return (
    <div className="container mt-3">
      <h1 className="pageheading">Register</h1>
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <form onSubmit={registerSubmitHandler} ref={form}>
          <div>
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={onChangeHandler}
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
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  onChange={onChangeHandler}
                  value={user.confirmpassword}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block registerbutton">Sign Up</button>
              </div>
              <div className="form-group">
                <a className="alreadyuser" href="/login"> Already Registered?</a>
              </div>
            </div>
        </form>
      </div>
  );
};

