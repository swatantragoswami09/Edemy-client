import axios from "axios";

export const logoutApi = async () => {
  try {
    const res = await axios.get("/api/logout");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
