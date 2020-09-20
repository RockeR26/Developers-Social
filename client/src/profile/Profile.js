import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import ProfileGitHub from "./ProfileGitHub";
//Redux
import { connect } from "react-redux";
import { getProfileById } from "../action/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <section className="container">
      <>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <>
            <a href="/profiles" className="btn btn-light">
              Go Back
            </a>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === match.params.id && (
                <a href="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </a>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((exp) => (
                      <ProfileExp key={exp._id} experience={exp} />
                    ))}
                  </>
                ) : (
                  <h4>No Experience Added</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu) => (
                      <ProfileEdu key={edu._id} education={edu} />
                    ))}
                  </>
                ) : (
                  <h4>No Education Added</h4>
                )}
              </div>
              {profile.githubUsername && (
                <ProfileGitHub user={profile.githubUsername} />
              )}
            </div>
          </>
        )}
      </>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
