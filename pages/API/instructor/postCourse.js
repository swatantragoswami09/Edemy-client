import axios from "axios";

export const postCourse = async (slug, course, values) => {
  try {
    const res = await axios.post(
      `/api/course/lesson/${slug}/${course.instructor._id}`,
      values
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
