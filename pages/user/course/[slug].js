import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect, createElement } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] }); // course lessons
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    console.log("sulg=>", slug);
    if (slug) loadCourse();
  }, [slug]);
  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/user/course/${slug}`);
      console.log("res data=>", data);
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("COMPLETED LESSONS = > ", data);
    setCompletedLessons(data);
  };
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log("data=>", data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };
  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log("markincomplete data =>", data);
      const all = completedLessons;
      console.log("all=> ", all);
      const index = all.indexOf(course.lessons[clicked]._id); // return true otherwise return -1
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL without removed=>", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
          <Button
            className="text-primary mt-1 btn-block mb-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            mode="inline"
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {course.lessons.map((lesson, index) => {
              return (
                <Menu.Item
                  onClick={() => setClicked(index)}
                  key={index}
                  icon={<Avatar>{index + 1}</Avatar>}
                >
                  {lesson.title.substring(0, 30)}{" "}
                  {completedLessons.includes(lesson._id) ? (
                    <CheckCircleFilled
                      className="float-right text-primary ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  ) : (
                    <MinusCircleFilled
                      className="float-right text-danger ml-2"
                      // style={{ marginTop: "13px" }}
                    />
                  )}
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="col alert alert-primary square">
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span
                    className="float-right pointer"
                    onClick={markIncompleted}
                  >
                    {" "}
                    Mark as Incomplete{" "}
                  </span>
                ) : (
                  <span className="float-right pointer" onClick={markCompleted}>
                    {" "}
                    Mark as completed{" "}
                  </span>
                )}
              </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        playing={false}
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                    <ReactMarkdown
                      children={course.lessons[clicked].content}
                      className="single-post"
                    />
                  </>
                )}
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleFilled className="text-primary display-1 p-5" />
                <p className="lead">Click on the lesson to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
