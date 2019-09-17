import React from "react";
import axios from "axios";

const Nav = props => {
  const logout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout")
      .then(res => {
        console.log(res, props, "loggedout!");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div className="nav">
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Nav;
