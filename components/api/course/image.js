import axios from "axios";

export const uploadImage = async (uri) => {
  try {
    const res = await axios.post("/api/course/upload-image", {
      image: uri,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const removeImage = async (image) => {
  try {
    const res = await axios.post("/api/course/remove-image", { image });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
export const updateImage = async (slug, values, image) => {
  try {
    const res = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
