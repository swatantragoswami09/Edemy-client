import axios from "axios";

export const putCourseUnpublish = async (courseId) => {
  try {
    const res = await axios.put(`/api/course/unpublish/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
