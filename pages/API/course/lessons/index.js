import axios from "axios";

export const removeLesson = async (slug, removed) => {
  try {
    const res = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const updateLesson = async (slug, current) => {
  try {
    const res = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const removePreviousVideo = async (values, current) => {
  try {
    const res = await axios.post(
      `/api/course/video-remove/${values.instructor._id}`,
      current.video
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
export const saveVideo = async (values, videoData, setProgress) => {
  try {
    const res = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
