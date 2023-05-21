import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
// E-> Education
// E-> Examination
// E-> Experience
// E-> Ethics
// yeh mat bhoolna tony stark ne bhi iron man patharo ke beech banaya tha

const UserIndex = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1 className="jumbotron text-center square">User Dashboard</h1>
      {/* show list of course */}
      {courses &&
        courses.map((course) => {
          return (
            <div key={course._id} className="media pt-2 pb-1">
              <div className="media-body pl-2">
                <div className="row">
                  <Avatar
                    size={80}
                    shape="square"
                    src={course.image ? course.image.Location : "/course.png"}
                  />
                  <div className="col">
                    <Link
                      href={`/user/course/${course.slug}`}
                      className="pointer"
                    >
                      <a>
                        <h5 className="mt-2 text-primary">{course.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length}{" "}
                    </p>
                    <p
                      className="text-muted"
                      style={{ marginTop: "-15px", fontSize: "12px" }}
                    >
                      By {course.instructor.name}
                    </p>
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    <Link href={`/user/course/${course.slug}`}>
                      <a>
                        <PlayCircleOutlined className="h2 pointer text-primary" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </UserRoute>
  );
};

export default UserIndex;
