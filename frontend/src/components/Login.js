import React, { useState, useRef } from "react";
import Form, { form } from "react-validation/build/form";
import Input from "react-validation/build/input";

export const Login = () => {

return (  
    <div className="container mt-3">
    <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </form>
      </div>
);
}
