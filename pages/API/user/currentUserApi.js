import axios from "axios";

export const currentUserApi = async () => {
  try {
    const res = await axios.get("/api/current-user");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
