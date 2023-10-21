import axios from "axios";

export const registerUser = async (data) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/register`,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const loginUser = async (data) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/login`,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const tokenStatus = async () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/users/token-status`,
    data: {
      signature: localStorage.getItem("token"),
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const logout = async () => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/logout`,
    data: {
      signature: localStorage.getItem("token"),
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};
