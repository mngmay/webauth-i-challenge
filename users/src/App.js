import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.js";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={LoginForm} />
      <PrivateRoute path="/users" component={UserList} />
    </div>
  );
}

export default App;
