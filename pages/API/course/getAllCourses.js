import axios from "axios";

export const getAllCourses = async () => {
  try {
    const res = await axios.get(`${process.env.API}/courses`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
