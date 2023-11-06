import axios from "axios";

export const addReviewApi = async (rating, user, course) => {
  try {
    const res = await axios.post("/api/add-review", {
      rating,
      user,
      course,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
