import React from "react";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="pic" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>At {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <a href={"/profile/user/" + _id} className="btn btn-primary">
          view profile
        </a>
      </div>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
