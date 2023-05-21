import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";

const SingleCourseJombotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  user,
  loading,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
    instructor,
  } = course;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="jumbotron bg-primary square p-5">
          <div className="row">
            <div className="col-md-8">
              {/* title */}
              <h1 className="text-light font-weight-bold">{name}</h1>

              {/* description */}
              <p className="lead">
                {" "}
                {description && description.substring(0, 160)}...
              </p>

              {/* category */}
              <Badge
                count={category}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-4 mr-2"
              />

              {/* author */}
              <p>Created By {instructor.name}</p>

              {/* updatedAt */}
              <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>

              {/* price */}
              <h4 className="text-light">
                {" "}
                {paid
                  ? currencyFormatter({
                      amount: price,
                      currency: "usd",
                    })
                  : "Free"}
              </h4>
            </div>
            <div className="col-md-4">
              {/* show video preview or course image */}
              {lessons[0].video && lessons[0].video.Location ? (
                <div
                  onClick={() => {
                    setPreview(lessons[0].video.Location);
                    setShowModal(!showModal);
                  }}
                >
                  <ReactPlayer
                    className="react-player-div"
                    url={lessons[0].video.Location}
                    light={image?.Location}
                    width="100%"
                    height="290px"
                  />
                </div>
              ) : (
                <>
                  <img
                    src={image?.Location}
                    alt={name}
                    className="img img-fluid"
                  />
                </>
              )}
              {/* enroll button */}
              {loading ? (
                <div className="d-flex justify-content-center">
                  <LoadingOutlined className="h1 text-danger" />
                </div>
              ) : (
                <Button
                  style={{ backgroundColor: "#F62817", color: "white" }}
                  className="mb-3 mt-3"
                  type="danger"
                  block
                  shape="round"
                  icon={<SafetyOutlined />}
                  size="large"
                  disabled={loading}
                  onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                >
                  {user
                    ? enrolled.status
                      ? "Go to Course"
                      : "Enroll"
                    : "Login to enroll"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCourseJombotron;
