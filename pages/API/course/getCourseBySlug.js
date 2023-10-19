import axios from "axios";

export const getCourseBySlug = async (query) => {
  try {
    const res = await axios.get(`${process.env.API}/course/${query.slug}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
