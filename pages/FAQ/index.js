import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Collapse } from "antd";
import { data, placedStudents } from "./data";
const { Meta } = Card;
import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function FAQ() {
  const { isDarkMode } = useContext(DarkModeContext);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-light"} `}>
      <h1 className="jumbotron text-center bg-primary square">
        <QuestionCircleOutlined /> FREQUENTLY ASKED QUESTIONS
      </h1>
      <div className="container col-md-5 offset-md-4 pb-5">
        <Collapse size="large" items={data} defaultActiveKey={["1"]} />
      </div>
      <div
        className={`container-fluid ${
          isDarkMode ? "bg-dark" : "bg-light"
        } pb-5 `}
      >
        {/* <Carousel autoplay afterChange={onChange}>
          {placedStudents.map((item) => {
            return (
              <div>
                <h1>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {item.image}{" "}
                    <div
                      style={{ marginLeft: "20px", flexDirection: "column" }}
                    >
                      {item.student}
                      <br />
                      <br />
                      <h5>{item.intro}</h5>
                    </div>
                    {item.companyLogo}
                  </div>
                </h1>
              </div>
            );
          })}
        </Carousel> */}
      </div>
    </div>
  );
}

export default FAQ;
