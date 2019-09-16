import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  return axios.create({
    headers: {
      Authorization: token,
      // totally don't really do this in real life
      username: username,
      password: password
    }
  });
};
