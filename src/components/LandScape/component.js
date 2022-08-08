import React from "react";
import Button from "../Button/component";
import "./index.scss";

const LandScape = () => {
  return (
    <div className="landscape container mb-140">
      <div className="landscape__content content-landscape">
        <h2 className="content-landscape__title title">
          Test assignment for front-end developer
        </h2>
        <div className="content-landscape__body">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </div>
        <div className="content-landscape__button">
          <Button>Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default LandScape;
