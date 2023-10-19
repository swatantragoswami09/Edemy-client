import axios from "axios";

export const getUserCoursesBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/user/course/${slug}`);
    console.log("res=>", res);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
