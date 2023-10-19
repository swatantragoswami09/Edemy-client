import axios from "axios";
import { toast } from "react-toastify";

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
