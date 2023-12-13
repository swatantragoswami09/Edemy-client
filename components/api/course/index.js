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

// course checkout after enrollment apis
// export const phonepayRedirectApi = async (requestBody) => {
//   console.log("phonepay env", process.env.NEXT_PUBLIC_PHONEPAY_API);
//   try {
//     const res = await axios.post(
//       // add into env
//       `${process.env.NEXT_PUBLIC_PHONEPAY_API}/makePayment`,
//       requestBody,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("we are inside index", res.data.url);

//     return res.data.url;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
export const stripeRedirectApi = async (course) => {
  try {
    const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
    console.log("data: ", data);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
