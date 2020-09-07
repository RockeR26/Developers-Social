import React from "react";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <a href="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </a>
      <a href="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </a>
      <a href="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </a>
    </div>
  );
};

export default DashboardActions;
