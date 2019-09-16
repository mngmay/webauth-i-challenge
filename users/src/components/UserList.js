import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserList = props => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/users")
      .then(usersList => {
        console.log(usersList);
        setUsers(usersList.data);
      })
      .catch(err => console.log(err));
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="userlist">
      <h1>Users List</h1>
      <div className="summary">
        The below illustrates that usernames and hashed passwords were
        successfully posted to a student database assignment. Please do not post
        passwords in real life.
      </div>

      <div className="details">
        <div className="usernames">
          <h3>Username</h3>
          {users.map(user => (
            <div className="row">{user.username}</div>
          ))}
        </div>
        <div className="hashed">
          <h3>#</h3>
          {users.map((user, index) => (
            <div
              className="row"
              onClick={toggleShow}
              name={user.username}
              key={index}
            >
              {!show ? "###" : user.password}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
