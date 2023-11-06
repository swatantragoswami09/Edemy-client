import axios from "axios";

export const getAllCourses = async () => {
  try {
    const res = await axios.get(`${process.env.API}/courses`);
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
export const getDirectCourseBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/course/${slug}`);
    return res.data.course;
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
export const getUserCoursesBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/user/course/${slug}`);
    console.log("res=>", res);
    return res.data;
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
