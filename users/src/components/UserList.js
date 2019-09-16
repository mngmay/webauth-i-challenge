import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserList = props => {
  const [users, setUsers] = useState([]);
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

  return (
    <>
      <div>Users List</div>
      {users.map(user => (
        <div>{user.username}</div>
      ))}
    </>
  );
};

export default UserList;
