import axios from "axios";

export const allTransactionApi = async () => {
  try {
    const res = await axios.get("/api/all-transactions");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
