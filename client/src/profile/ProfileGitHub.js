import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
//Redux
import { connect } from "react-redux";
import { getRepos } from "../action/profile";

const ProfileGitHub = ({ user, getRepos, repos }) => {
  useEffect(() => {
    getRepos(user);
  }, [getRepos, user]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repositories</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.descrition}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars:{repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Views:{repo.watchers_count}
                </li>
                <li className="badge badge-light">Forkes:{repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGitHub.propTypes = {
  repos: PropTypes.array.isRequired,
  getRepos: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getRepos })(ProfileGitHub);
