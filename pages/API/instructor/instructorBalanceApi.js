import axios from "axios";

export const instructorBalanceApi = async () => {
  try {
    const res = await axios.get("/api/instructor/balance");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
