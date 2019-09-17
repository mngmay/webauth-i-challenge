import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Form = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/api/auth/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("username", credentials.username);
        localStorage.setItem("password", credentials.password);
        props.history.push("/users");
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const register = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/api/auth/register", credentials)
      .then(res => {
        console.log(res);
        setLoading(false);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
  };

  let submitHandler;

  props.match.path === "/register"
    ? (submitHandler = register)
    : (submitHandler = login);

  return (
    <div className="login">
      <h1>{submitHandler === register ? "Sign Up" : "Login"}</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>{submitHandler === register ? "Sign Up" : "Login"}</button>
        {props.location.pathname !== "/register" && (
          <button
            onClick={() => props.history.push("/register")}
            className="signUpBtn"
          >
            Sign Up
          </button>
        )}
      </form>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Form;
