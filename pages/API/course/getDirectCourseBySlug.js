import axios from "axios";

export const getDirectCourseBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/course/${slug}`);
    return res.data.course;
  } catch (error) {
    console.log(error.message);
  }
};
