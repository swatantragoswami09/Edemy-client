import axios from "axios";

export const getCurrentInstructor = async () => {
  try {
    const res = await axios.get("/api/current-instructor");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
