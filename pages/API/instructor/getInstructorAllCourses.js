import axios from "axios";

export const getInstructorAllCourses = async () => {
  try {
    const res = await axios.get("/api/instructor-courses");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
