import CourseCard from "../components/cards/CourseCard";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useState } from "react";
import { getAllCourses } from "../components/api";
import { Carousel } from "antd";
import { Footer } from "../components/footer/Footer";

const Index = ({ courses }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courses ? setLoading(false) : setLoading(true);
  }, [loading]);

  const header = () => {
    return (
      <Carousel autoplay>
        <div>
          <h1
            className="jumbotron text-center bg-primary "
            style={{ fontSize: "60px" }}
          >
            🌟 SKG University
            <h5 style={{ fontSize: "22px" }}>
              Learn form the TOP IT professionals
            </h5>
          </h1>
        </div>
        <div>
          <h1
            className="jumbotron text-center bg-primary "
            style={{ fontSize: "60px" }}
          >
            Are You Smart, Creative and Driven?
            <h5 style={{ fontSize: "22px" }}>
              Explore a World of Big Opportunities
            </h5>
          </h1>
        </div>
        <div>
          <h1
            className="jumbotron text-center bg-primary "
            style={{ fontSize: "60px" }}
          >
            Strong Relationships Guarantee Success
            <h5 style={{ fontSize: "22px" }}>
              Open new revenue streams and growth channels
            </h5>
          </h1>
        </div>
      </Carousel>
    );
  };
  const getCourses = (courses, loading) => {
    return (
      <div
        className={`container-fluid ${isDarkMode ? "text-light" : ""}  ${
          isDarkMode ? "bg-dark" : "bg-light"
        }`}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course) => (
          <div
            key={course._id}
            className="col-md-3"
            style={{ padding: "14px" }}
          >
            <CourseCard loading={loading} course={course} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`container-fluid ${isDarkMode ? "text-light" : ""}  ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      {/* header */}
      {header()}

      {/* all courses */}
      {getCourses(courses, loading)}

      {/* footer */}
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const data = await getAllCourses();
  return {
    props: {
      courses: data.all,
    },
  };
}
export default Index;
