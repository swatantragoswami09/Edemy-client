import axios from "axios";

export const getCurrentInstructor = async () => {
  try {
    const res = await axios.get("/api/current-instructor");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getInstructorAllCourses = async () => {
  try {
    const res = await axios.get("/api/instructor-courses");
    console.log(res);
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

export const postVideo = async (course, videoData, setProgress, e) => {
  try {
    const res = await axios.post(
      `/api/course/video-upload/${course.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

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

export const putCoursePublish = async (courseId) => {
  try {
    const res = await axios.put(`/api/course/publish/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const putCourseUnpublish = async (courseId) => {
  try {
    const res = await axios.put(`/api/course/unpublish/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

