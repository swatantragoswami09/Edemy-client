import axios from "axios";

export const getCsrfTokenApi = async () => {
  try {
    const res = await axios.get("/api/csrf-token");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
