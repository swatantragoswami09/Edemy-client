import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import { DarkModeContext } from "../../../context/DarkModeContext";
import CourseCard from "../../../components/cards/CourseCard";

const FilteredCourses = () => {
  const [courses, setCourses] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`/api/courses/search/${slug}`);
        console.log(data.length);
        if (data.length > 0) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (slug) {
      fetchCourses();
    }
  }, [router.query]);

  const header = (courses) => {
    return (
      <>
        {courses.length === 0 ? (
          <h1 className="jumbotron text-center bg-primary square">
            Course Not Found
          </h1>
        ) : (
          <h1 className="jumbotron text-center bg-primary square">
            Result's Found
          </h1>
        )}
      </>
    );
  };
  const searchResult = (courses) => {
    return (
      <Row gutter={[16, 16]}>
        {" "}
        {/* Set gutter spacing between columns */}
        {courses.map((course) => (
          <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
            {" "}
            {/* Define column span for different screen sizes */}
            <CourseCard course={course} loading={false} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <div
        className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-light"} `}
      >
        {/* header */}
        {header(courses)}

        {/* search result */}
        {searchResult(courses)}
      </div>
    </>
  );
};

export default FilteredCourses;
