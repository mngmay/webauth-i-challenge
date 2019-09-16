import React, { useState } from "react";
import axios from "axios";

const LoginForm = props => {
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
      .post("http://localhost:5000/api/restricted/login", credentials)
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
  return (
    <>
      <form onSubmit={login}>
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
        <button>Login</button>
      </form>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default LoginForm;
