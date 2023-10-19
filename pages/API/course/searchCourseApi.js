import axios from "axios";

export const searchCourseApi = async (value) => {
  try {
    const res = await axios.get(`/api/courses/search/${value}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
