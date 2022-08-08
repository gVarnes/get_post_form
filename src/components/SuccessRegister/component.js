import React from "react";
import image from "./success-image.svg";
import "./index.scss";

const SuccessRegister = () => {
  return (
    <div className="success container">
      <h2 className="success__title title mb-50">
        User successfully registered
      </h2>
      <div className="success__image">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default SuccessRegister;
