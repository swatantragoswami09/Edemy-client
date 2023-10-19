import axios from "axios";

export const putCoursePublish = async (courseId) => {
  try {
    const res = await axios.put(`/api/course/publish/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
