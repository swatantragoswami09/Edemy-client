import axios from "axios";

export const currentUserApi = async () => {
  try {
    const res = await axios.get("/api/current-user");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCsrfTokenApi = async () => {
  try {
    const res = await axios.get("/api/csrf-token");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getReferralByIdApi = async (userId) => {
  try {
    const res = await axios.post(`/api/getReferralsById`, {
      userId: userId,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const res = await axios.post(`/api/login`, {
      email,
      password,
    });
    console.log("response: " + res);
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
    console.log(error.response.data);
  }
};

export const logoutApi = async () => {
  try {
    const res = await axios.get("/api/logout");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUserApi = async (name, email, password) => {
  try {
    const res = await axios.post(`/api/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
    console.log(error.message);
  }
};
