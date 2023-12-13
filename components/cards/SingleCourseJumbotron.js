import React, { useState } from "react";
import { currencyFormatter, dateFormater } from "../../utils/helpers";
import { Badge, Modal, Button, Rate } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { addReviewApi } from "../api";
import { toast } from "react-toastify";
import router from "next/router";
const SingleCourseJombotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  user,
  loading,
  handlePhonepayRedirect,
  handleStripeRedirect,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [modal2Open, setModal2Open] = useState(false);
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
    rating,
  } = course;
  console.log(user);

  const reviewHandle = async (userRating, userId, courseId) => {
    console.log(userRating, userId, courseId);
    const data = await addReviewApi(userRating, userId, courseId);
    toast.success(data.message);
    console.log(data);
  };

  return (
    <div
      className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-primary"}   ${
        isDarkMode ? "text-light" : "text-dark"
      }`}
    >
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
              <p>
                Last updated{" "}
                {new Date(updatedAt).toLocaleDateString("en-IN", dateFormater)}
              </p>

              {/* price */}
              <h4
                className="text-light"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {" "}
                {paid ? "₹ " + price : "Free"}
                {/* rating */}
                {user?.user?._id !== null ? (
                  <Rate
                    style={{ marginLeft: "30px" }}
                    onChange={(userRating) =>
                      reviewHandle(userRating, user?.user?._id, course._id)
                    }
                    allowHalf
                    defaultValue={rating}
                  />
                ) : (
                  <Rate
                    style={{ marginLeft: "30px" }}
                    onChange={() => console.log("this should be login first")}
                    allowHalf
                    defaultValue={4.5}
                  />
                )}
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
                <>
                  <Button
                    style={{ backgroundColor: "#F62817", color: "white" }}
                    className="mb-3 mt-3"
                    type="danger"
                    block
                    shape="round"
                    icon={<SafetyOutlined />}
                    size="large"
                    disabled={loading}
                    onClick={() =>
                      paid
                        ? enrolled.status
                          ? router.push(`/user/course/${enrolled.course.slug}`)
                          : setModal2Open(true)
                        : handleFreeEnrollment
                    }
                  >
                    {user
                      ? enrolled.status
                        ? "Go to Course"
                        : "Enroll"
                      : "Login to enroll"}
                  </Button>
                  <Modal
                    title="Please Select Payment Method"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "28px",
                        height: "400px",
                      }}
                    >
                      <img
                        src="/assets/phonepay.png"
                        width={100}
                        height={100}
                        alt="phonepay.png"
                        onClick={handlePhonepayRedirect}
                      />
                      <img
                        src="/assets/stripelogo.png"
                        width={100}
                        height={100}
                        alt="stripelogo.png"
                        style={{ borderRadius: "1000px" }}
                        onClick={handleStripeRedirect}
                      />
                    </div>
                  </Modal>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCourseJombotron;
