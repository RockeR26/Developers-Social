import React, { Fragment } from "react";
import spinner from "../img/spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Spinner"
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Spinner;