// user
export {
  currentUserApi,
  getCsrfTokenApi,
  getReferralByIdApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
} from "./user/";

// courses
export {
  getAllCourses,
  getCourseBySlug,
  getDirectCourseBySlug,
  getUserAllOwnedCourses,
  getUserCoursesBySlug,
  searchCourseApi,
  // phonepayRedirectApi,
  stripeRedirectApi,
} from "./course";
export { uploadImage, removeImage, updateImage } from "./course/image";
export {
  removeLesson,
  updateLesson,
  removePreviousVideo,
  saveVideo,
} from "./course/lessons";
// instructor
export {
  getCurrentInstructor,
  getInstructorAllCourses,
  instructorBalanceApi,
  postCourse,
  postStudentCount,
  postVideo,
  postVideoRemove,
  putCoursePublish,
  putCourseUnpublish,
} from "./instructor";

// review
export { addReviewApi } from "./review";

// stripe
export { allTransactionApi } from "./stripe";
