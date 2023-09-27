import axios from "axios";

export const getAllCourses = async () => {
  try {
    const res = await axios.get(`${process.env.API}/courses`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const res = await axios.post(`/api/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export const logoutApi = async () => {
  try {
    const res = await axios.get("/api/logout");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUserApi = async (name, email, password) => {
  try {
    const res = await axios.post(`/api/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserAllOwnedCourses = async () => {
  try {
    const res = await axios.get("/api/user-courses");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCsrfTokenApi = async () => {
  try {
    const res = await axios.get("/api/csrf-token");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const currentUserApi = async () => {
  try {
    const res = await axios.get("/api/current-user");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getInstructorAllCourses = async () => {
  try {
    const res = await axios.get("/api/instructor-courses");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCurrentInstructor = async () => {
  try {
    const res = await axios.get("/api/current-instructor");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getReferralByIdApi = async (userId) => {
  try {
    const res = await axios.post(`/api/getReferralsById`, {
      userId: userId,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const searchCourseApi = async (value) => {
  try {
    const res = await axios.get(`/api/courses/search/${value}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const allTransactionApi = async () => {
  try {
    const res = await axios.get("/api/all-transactions");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const instructorBalanceApi = async () => {
  try {
    const res = await axios.get("/api/instructor/balance");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCourseBySlug = async (query) => {
  try {
    const res = await axios.get(`${process.env.API}/course/${query.slug}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

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

export const getUserCoursesBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/user/course/${slug}`);
    console.log("res=>", res);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
