import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Collapse } from "antd";
import { data } from "./data";
// import { Footer } from "../../components/footer/Footer";
const { Meta } = Card;

function FAQ() {
  const { isDarkMode } = useContext(DarkModeContext);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const header = () => {
    return (
      <h1 className="jumbotron text-center bg-primary square">
        <QuestionCircleOutlined /> FREQUENTLY ASKED QUESTIONS
      </h1>
    );
  };
  const questions = (data) => {
    return (
      <div className="container col-md-5 offset-md-4 pb-5">
        <Collapse size="large" items={data} defaultActiveKey={["1"]} />
      </div>
    );
  };
  const carosol = () => {
    return (
      <div
        className={`container-fluid ${
          isDarkMode ? "bg-dark" : "bg-light"
        } pb-5 `}
      >
        {/* Feedback */} // TODO - need to build this
      </div>
    );
  };
  return (
    <div className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-light"} `}>
      {/* header */}
      {header()}

      {/* question */}
      {questions(data)}

      {/* carosol */}
      {carosol()}

      {/* footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default FAQ;
