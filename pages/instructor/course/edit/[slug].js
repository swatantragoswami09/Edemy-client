import { useState, useEffect, useContext } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Avatar, List, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// APIs
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";
import { getDirectCourseBySlug } from "../../../API/course/getDirectCourseBySlug";
import {
  uploadImage,
  removeImage,
  updateImage,
} from "../../../API/course/image";
import {
  removeLesson,
  removePreviousVideo,
  saveVideo,
  updateLesson,
} from "../../../API/course/lessons";
import { DarkModeContext } from "../../../../context/DarkModeContext";

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    imagePreview: "",
    lessons: [],
  });

  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [uploadButtionText, setUploadButtionText] = useState("Upload Image");

  //   state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const data = await getDirectCourseBySlug(slug);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtionText(file.name);
    setValues({ ...values, loading: true });

    // reize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let data = await uploadImage(uri);
        console.log("resize image data=>", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (error) {
        console.log(error);
        setValues({ ...values, loading: true });
        toast("Image upload failed. Try later.");
      }
    });
  };
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await removeImage(image);
      setImage({});
      setPreview("");
      setUploadButtionText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (error) {
      console.log(error);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateImage(slug, values, image);
      toast("Course updated");
      router.push("/instructor");
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    }
  };
  const handleDrag = (e, index) => {
    console.log("ON DRAG =>", index);
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;
    let movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index
    setValues({ ...values, lessons: [...allLessons] });
    // save the new lesson order in db
    const data = await updateImage(slug, values, image);
    toast("Lessons rearrange successfully");
  };
  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete ?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);

    setValues({ ...values, lessons: allLessons });
    //  send request to server
    const data = await removeLesson(slug, removed);
    console.log("LESSON DELETED=>", data);
    toast.success("Lesson deleted successfully");
  };

  /**
   * lesson update functions
   */
  const handleVideo = async (e) => {
    // remove previous video
    if (current.video && current.video.Location) {
      const res = await removePreviousVideo(values, current);
      console.log("REMOVED ==>", res);
    }
    // upload
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);
    // save progress bar and send video as form data to backend
    const data = await saveVideo(values, videoData, setProgress);
    console.log("data=> =", data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const data = await updateLesson(slug, current);
    setUploadVideoButtonText("Upload Video");

    setVisible(false);
    // Update ui
    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast("Lesson Updated");
    }
  };
  const createForm = () => {
    return (
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtionText={uploadButtionText}
          editPage={true}
        />
      </div>
    );
  };
  const listOfLessons = () => {
    return (
      <div
        className={`row ${isDarkMode ? "bg-dark" : "bg-light"}   ${
          isDarkMode ? "text-light" : "text-dark"
        }`}
      >
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => {
              return (
                <List.Item
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  <List.Item.Meta
                    onClick={() => {
                      setVisible(true);
                      setCurrent(item);
                    }}
                    avatar={<Avatar>{index + 1} </Avatar>}
                    title={item.title}
                  ></List.Item.Meta>
                  <DeleteOutlined
                    onClick={() => handleDelete(index)}
                    className="text-danger float-right"
                  />
                </List.Item>
              );
            }}
          ></List>
        </div>
      </div>
    );
  };

  const updateModal = () => {
    return (
      <Modal
        title="Update lesson"
        centered
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          handleVideo={handleVideo}
          progress={progress}
          uploading={uploading}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    );
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center bg-primary square">Update Course</h1>
      {/* create form */}
      {createForm()}
      <hr />
      {/* list of lessons */}
      {listOfLessons()}
      {/* update modal */}
      {updateModal()}
    </InstructorRoute>
  );
};

export default CourseEdit;
