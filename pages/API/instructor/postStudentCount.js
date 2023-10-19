import axios from "axios";

export const postStudentCount = async (course) => {
  try {
    const res = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
