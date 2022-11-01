import { Outlet, Link } from "react-router-dom";
import classes from "./Header.module.css";

export const Header = () => {
  return (
    <>
       <nav className="navbar navbar-expand navbar-dark bg-dark">
       <Link to={"/"} className="navbar-brand">
          E-Commerce
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
            Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
            Login
            </Link>
          </li>
          </div>
      </nav>
      <Outlet />
    </>
  )
};

