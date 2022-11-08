import { Outlet, Link } from "react-router-dom";
import "./Header.css";

import AuthService  from "../../services/auth.service";

export const Header = () => {
  var authenticatedUser = localStorage.getItem("user");
  var currentUser = JSON.parse(authenticatedUser);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <>
       <nav className="navbar navbar-expand navbar-dark bg-dark align-items-center">
       <Link to={"/"} className="navbar-brand">
          E-Commerce
        </Link>
        {authenticatedUser ? 
        (<div className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={"/"} className="nav-link">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
            Products
            </Link>
          </li>  
          {!currentUser.isAdmin && <li className="nav-item">
            <Link to={"/cart"} className="nav-link">
            Cart
            </Link>
          </li>  }
             
          <li className="nav-item">
            <Link to={"/login"} className="nav-link" onClick={logOut}>
            Logout
            </Link>
          </li>
          </div> ) :

         (<div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
            Login
            </Link>
          </li> 
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
            Register
            </Link>
          </li>
          </div>
          )}
      </nav>
      <Outlet />
    </>
  )
};

