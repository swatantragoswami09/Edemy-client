// https://youtu.be/EGXnsGenlCg ---> add comment recursively
import React from "react";

const Action = ({ handleClick, type, className }) => {
  return (
    <div
      className={className}
      onClick={handleClick}
      style={{ backgroundColor: "red" }}
    >
      {type}
    </div>
  );
};

export default Action;
