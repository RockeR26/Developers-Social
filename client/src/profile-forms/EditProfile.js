import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../action/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocial, toggleSocial] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills,
      githubUsername:
        loading || !profile.githubUsername ? "" : profile.githubUsername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.twitter ? "" : profile.twitter,
      facebook: loading || !profile.facebook ? "" : profile.facebook,
      linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
      youtube: loading || !profile.youtube ? "" : profile.youtube,
      instagram: loading || !profile.instagram ? "" : profile.instagram,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
    createProfile(formData, history, true);
  }

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <select name="status" value={status} onChange={onChange}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={onChange}
              name="company"
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              value={website}
              onChange={onChange}
              name="website"
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={onChange}
              name="location"
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              value={skills}
              onChange={onChange}
              name="skills"
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              value={githubUsername}
              onChange={onChange}
              name="githubUsername"
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              value={bio}
              onChange={onChange}
              name="bio"
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => toggleSocial(!displaySocial)}
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocial && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={twitter}
                  onChange={onChange}
                  name="twitter"
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  value={facebook}
                  onChange={onChange}
                  name="facebook"
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={youtube}
                  onChange={onChange}
                  name="youtube"
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  value={linkedin}
                  onChange={onChange}
                  name="linkedin"
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={onChange}
                  name="instagram"
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="/dashboard">
            Go Back
          </a>
        </form>
      </Fragment>
    </section>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStatetoProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
