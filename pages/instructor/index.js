import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getInstructorAllCourses } from "../API";
import { Context } from "../../context";
import { Header } from "../../components/header/Header";
import { DarkModeContext } from "../../context/DarkModeContext";

const InstructorIndex = () => {
  // state
  const [courses, setCourses] = useState([]);
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const loadCourses = async () => {
    const data = await getInstructorAllCourses();
    console.log(data);
    setCourses(data);
  };
  useEffect(async () => {
    loadCourses();
    () => {
      setCourses();
    };
  }, []);

  if (user == null) {
    // router.push("/");
    return null;
  }

  const myStyle = { marginTop: "-15px", fontSize: "20px" };

  const getCourses = (courses) =>
    courses.map((course, index) => {
      return (
        <div
          className={`media pl-2 ${isDarkMode ? "bg-dark" : "bg-light"}   ${
            isDarkMode ? "text-light" : "text-dark"
          }`}
          key={index}
        >
          <div className="media-body">
            <div className="row">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="col">
                <Link
                  href={`/instructor/course/view/${course.slug}`}
                  className="pointer"
                >
                  <a className="mt-2 text-primary">
                    <h5 className="pt-2">{course.name}</h5>
                  </a>
                </Link>
                <p style={{ marginTop: "-10px" }}>
                  {course.lessons.length} Lessons
                </p>

                {course.lessons.length < 5 ? (
                  <p style={myStyle} className="text-warning">
                    At least 5 lessons are required to publish the course
                  </p>
                ) : course.published ? (
                  <p style={myStyle} className="text-success">
                    Your course is live in the marketplace
                  </p>
                ) : (
                  <p style={myStyle} className="text-success">
                    Your course is ready to be published
                  </p>
                )}
              </div>
              <div className="col-md-3 mt-3 text-center">
                {course.published ? (
                  <Tooltip title="Published">
                    <CheckCircleOutlined className="h5 pointer text-success" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Unpublished">
                    <CloseCircleOutlined className="h5 pointer text-warning" />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <InstructorRoute>
      {/* header */}
      <Header header="Instructor Dashboard" />

      {/* courses */}
      {courses && getCourses(courses)}
    </InstructorRoute>
  );
};

export default InstructorIndex;
