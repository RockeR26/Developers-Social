import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { deleteEducation } from "../action/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td className="hide-sm">{exp.degree}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <button
          onClick={() => deleteEducation(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
