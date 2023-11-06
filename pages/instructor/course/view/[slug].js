import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Upload, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";

// APIs
import { postStudentCount } from "../../../../components/api/";
import { getDirectCourseBySlug } from "../../../../components/api/";
import { postCourse } from "../../.././../components/api";
import { postVideo } from "../../../../components/api/";
import { postVideoRemove } from "../../../../components/api";
import { putCoursePublish } from "../../../../components/api";
import { putCourseUnpublish } from "../../../../components/api";
import { DarkModeContext } from "../../../../context/DarkModeContext";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
  //  student count
  const [students, setStudents] = useState(0);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const studentCount = async () => {
    const data = await postStudentCount(course);
    console.log("STUDENT COUNT =>", data);
    setStudents(data.length);
  };
  const loadCourse = async () => {
    const data = await getDirectCourseBySlug(slug);
    setCourse(data);
  };

  // FUNTIONS FOR ADD LESSON
  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const data = await postCourse(slug, course, values);
      setValues({ ...values, title: "", content: "", video: {} });
      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);
      setCourse(data);
      toast("Lesson added");
    } catch (error) {
      console.log(error);
      toast("Lesson add failed");
    }
  };
  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);

      // save progress bar and send the video as form data to backend
      const data = await postVideo(course, videoData, setProgress, e);

      //  once response is received
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
      toast("Video upload failed");
    }
  };
  const handleVideoRemove = async () => {
    try {
      setProgress(true);
      const data = await postVideoRemove(course, values);
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast("Video remove failed");
    }
  };
  const handlePublish = async (e, courseId) => {
    try {
      //  will continue from here
      let answer = window.confirm(
        "Once you publish your course, it will be live in the marketplace for user to wnroll"
      );
      if (!answer) return;
      const data = await putCoursePublish(courseId);
      setCourse(data);
      toast("Congrats! Your course is  live");
    } catch (error) {
      console.log(error);
      toast("Course publish failed. Try again");
    }
  };
  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you unpublish your course, it will no be available for users to enroll"
      );
      if (!answer) return;
      const data = await putCourseUnpublish(courseId);
      setCourse(data);
      toast("Your course is Unpublish");
    } catch (error) {
      console.log(error);

      console.log(error);
      toast("Course publish failed. Try again");
    }
  };

  const topHeader = () => {
    return (
      <div className="media pt-2">
        <div className="media-body pl-2">
          <div className="row">
            <Avatar
              size={80}
              src={course.image ? course.image.location : "/course.png"}
            />
            <div className="col">
              <h5 className="mt-2 text-primary">{course.name}</h5>
              <p>{course.lession && course.lession.length} Lessions</p>
              <p style={{ marginTop: "-15px", fontSize: "20px" }}>
                {course.category}
              </p>
            </div>
            <div
              className="col-md-3 mt-3 text-center "
              style={{ cursor: "pointer" }}
            >
              <Tooltip title={`${students} Enrolled`}>
                <UserSwitchOutlined
                  style={{ marginRight: "20px" }}
                  className="h5 pointer text-info mr-4"
                />
              </Tooltip>
              <Tooltip title="Edit">
                <EditOutlined
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                  className="h5 pointer text-warning mr-4"
                />
              </Tooltip>
              {course.lessons && course.lessons.length < 5 ? (
                <Tooltip title="Min 5 lessons required to publish">
                  <QuestionOutlined
                    className="h5 pointer text-danger"
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
              ) : course.published ? (
                <Tooltip title="Unpublish">
                  <CloseOutlined
                    onClick={(e) => handleUnpublish(e, course._id)}
                    className="h5 pointer text-danger"
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Publish">
                  <CheckOutlined
                    onClick={(e) => handlePublish(e, course._id)}
                    className="h5 pointer text-success"
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
              )}
              {/* <Tooltip title="Publish">
                      <CheckOutlined
                        className="h5 pointer text-danger"
                        style={{ marginLeft: "20px" }}
                      />
                    </Tooltip> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const courseDescription = (course) => {
    return (
      <div className="row">
        <div className="col">
          <ReactMarkdown children={course.description} />
        </div>
      </div>
    );
  };

  const addLessonButton = () => {
    return (
      <div className="row">
        <Button
          onClick={() => setVisible(true)}
          className="col-md-6 offset-md-3 text-center"
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size="large"
        >
          Add lesson
        </Button>
      </div>
    );
  };

  const addLessonModal = () => {
    return (
      <Modal
        title="+ Add lesson"
        centered
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddLessonForm
          values={values}
          setValues={setValues}
          handleAddLesson={handleAddLesson}
          uploading={uploading}
          uploadButtonText={uploadButtonText}
          handleVideo={handleVideo}
          progress={progress}
          handleVideoRemove={handleVideoRemove}
        />
      </Modal>
    );
  };

  const lessonsList = (course) => {
    return (
      <div className="row">
        <div className="col lesson-list">
          <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
          <List
            itemLayout="horizontal"
            dataSource={course && course.lessons}
            renderItem={(item, index) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{index + 1} </Avatar>}
                    title={item.title}
                  ></List.Item.Meta>
                </List.Item>
              );
            }}
          ></List>
        </div>
      </div>
    );
  };

  return (
    <InstructorRoute>
      <div
        className={`container-fluid pt-3 ${
          isDarkMode ? "bg-dark" : "bg-light"
        }   ${isDarkMode ? "text-light" : "text-dark"}`}
      >
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            {/* header of course view */}
            {topHeader(course, students)}
            <hr />
            {/* course description */}
            {courseDescription(course)}
            {/* add lesson button */}
            {addLessonButton()}
            <br />
            {/* add lesson modal */}
            {addLessonModal()}
            {/* lessonList */}
            {lessonsList(course)}
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};
export default CourseView;
