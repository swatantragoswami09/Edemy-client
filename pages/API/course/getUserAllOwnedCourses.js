import axios from "axios";

export const getUserAllOwnedCourses = async () => {
  try {
    const res = await axios.get("/api/user-courses");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
