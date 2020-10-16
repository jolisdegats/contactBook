import axios from "axios";
import Config from "../config";

export const fetchAllUsers = async () => {
  try {
    const users = await axios.get(Config.apiUrl);
    const response = users.data.map((user) => {
      return {
        ...user,
        profilePic: `${Config.profilePics}/${user.username}.svg`,
      };
    });
    return response;
  } catch (err) {
    return console.error(err);
  }
};

export const getOneUser = async (id, users) => {
  try {
    const user = users.find((u) => {
      return u.id === id;
    });
    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const fetchOneUserByID = async (id) => {
  try {
    const user = await axios.get(`${Config.apiUrl}/${id}`);
    const response = {
      ...user.data,
      profilePic: `${Config.profilePics}/${user.data.username}.svg`,
    };
    return response;
  } catch (err) {
    return console.error(err);
  }
};

export const getUsersFromStore = (state) => state.usersReducer.users;
