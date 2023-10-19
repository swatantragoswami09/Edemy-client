import axios from "axios";

export const postVideoRemove = async (course, values) => {
  try {
    const res = await axios.post(
      `/api/course/video-remove/${course.instructor._id}`,
      values.video
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
