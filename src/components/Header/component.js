import React from "react";
import Button from "../Button/component";
import "./index.scss";

import { Link } from "react-router-dom";

import logo from "./logo.svg";
import logotext from "./logotext.svg";

const Header = () => {
  return (
    <header className="header container">
      <div className="header__logo">
        <img src={logo} alt="" />
        <img src={logotext} alt="" />
      </div>
      <div className="header__controls">
        <Button>User</Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button>Sign up</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
