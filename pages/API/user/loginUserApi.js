import axios from "axios";
import { toast } from "react-toastify";

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
