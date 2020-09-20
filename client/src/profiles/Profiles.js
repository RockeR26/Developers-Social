import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import ProfileItem from "./ProfileItem";
//redux
import { connect } from "react-redux";
import { getProfiles } from "../action/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  function abc() {
    console.log(profiles, loading);
  }
  abc();
  return (
    <section className="container">
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fb fa-connectdevelope"></i>Browse and connect with
              developers around the world
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((pro) => (
                  <ProfileItem key={pro._id} profile={pro} />
                ))
              ) : (
                <h4>No Profiles found....</h4>
              )}
            </div>
          </>
        )}
      </>
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
