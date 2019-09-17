import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Form from "./components/Form";
import UserList from "./components/UserList";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Form} />
      <PrivateRoute path="/" component={Nav} />
      <Route path="/register" component={Form} />
      <PrivateRoute path="/users" component={UserList} />
    </div>
  );
}

export default App;
