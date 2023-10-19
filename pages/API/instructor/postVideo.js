import axios from "axios";

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
