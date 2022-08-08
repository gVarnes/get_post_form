import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

const Button = ({ children, actionOnClick, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`header__button button ${disabled && "disabled"}`}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.string,
  actionOnClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
};

export default Button;
