import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useState } from "react";

const Index = ({ courses }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courses ? setLoading(false) : setLoading(true);
  }, [loading]);

  return (
    <div
      className={`container-fluid ${isDarkMode ? "text-light" : ""}  ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <h1
        className="jumbotron text-center bg-primary "
        style={{ fontSize: "70px" }}
      >
        SKG University
      </h1>
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
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}
export default Index;
